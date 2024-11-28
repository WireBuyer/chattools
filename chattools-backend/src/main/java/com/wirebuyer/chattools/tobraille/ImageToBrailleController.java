package com.wirebuyer.chattools.tobraille;

import com.wirebuyer.chattools.security.filterchain.CustomOidcUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/")
public class ImageToBrailleController {

    private final ImageToBrailleService imageToBrailleService;

    public ImageToBrailleController(ImageToBrailleService imageToBrailleService) {
        this.imageToBrailleService = imageToBrailleService;
    }

    // use @RequestPart for the DTO since it uses HttpMessageConverters and the header for that part of the request.
    // it's useful for multipart/form-data type requests. used to convert the json object.
    // can use @RequestBody for something simple like String
    @PostMapping(value = "/brailleConverter")
    @CrossOrigin(origins = "*")
    public String convertImageToBraille(
            @RequestPart(required = false) @Validated BrailleOptions brailleOptions,
            @RequestPart MultipartFile user_image,
            @AuthenticationPrincipal CustomOidcUser principal)
    {
        if (brailleOptions == null) { brailleOptions = new BrailleOptions(); }
        return imageToBrailleService.convertImage(user_image, brailleOptions, principal);
    }

    // it's probably dumb to paginate this. only keeping it here so i can show me using it.
    // remove it if i ever find another place where i can use pages
    @GetMapping(value = "/saved")
    @CrossOrigin(origins = "*")
    public Page<AsciiDto> getSavedAscii(
            @AuthenticationPrincipal OidcUser principal,
            @PageableDefault(size = 4) Pageable pageable) {
        return imageToBrailleService.getAscii(principal.getSubject(), pageable);
    }

    @DeleteMapping(value = "/saved")
    @CrossOrigin(origins = "*")
    public void deleteSavedAscii(@AuthenticationPrincipal OidcUser principal, @RequestBody List<UUID> ids) {
        System.out.println("123");
        imageToBrailleService.deleteAsciis(principal.getSubject(), ids);
    }
}

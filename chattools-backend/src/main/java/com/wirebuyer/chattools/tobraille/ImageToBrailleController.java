package com.wirebuyer.chattools.tobraille;

import com.wirebuyer.chattools.security.filterchain.CustomOidcUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.validation.annotation.Validated;
import org.springframework.http.MediaType;
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

    // brailleOptions was a json object, so I had to use @RequestPart with @json properties to handle the conversion. 
    // now I use @ModelAttribute for simple form fields to make the object. more info in the old git commit
    @PostMapping(
            value = "/brailleConverter",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @CrossOrigin(origins = "*")
    public String convertImageToBraille(
            @RequestParam("image") MultipartFile image,
            @Validated @ModelAttribute BrailleOptions brailleOptions,
            @AuthenticationPrincipal CustomOidcUser principal) {

        return imageToBrailleService.convertImage(image, brailleOptions, principal);
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

package com.wirebuyer.chattools.tobraille;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/")
public class ImageToBrailleController {

    private final ImageToBrailleService imageToBrailleService;

    public ImageToBrailleController(ImageToBrailleService imageToBrailleService) {
        this.imageToBrailleService = imageToBrailleService;
    }

    // use @RequestPart for the DTO since it uses HttpMessageConverters and the header for that part of the request.
    // Used to convert JSON. Use @RequestParam for something like String
    @PostMapping(value = "/brailleConverter")
    @CrossOrigin(origins = "*")
    public String submit_image(
            @RequestPart(required = false) @Validated BrailleOptions brailleOptions,
            @RequestPart MultipartFile user_image)
    {
        if (brailleOptions == null) { brailleOptions = new BrailleOptions(); }
        return imageToBrailleService.convertImage(user_image, brailleOptions);
    }
}

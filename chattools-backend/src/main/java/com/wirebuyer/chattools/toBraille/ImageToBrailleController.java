package com.wirebuyer.chattools.toBraille;

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

    @PostMapping(value = "/brailleConverter")
    @CrossOrigin(origins = "*")
    public String submit_image(
            @RequestPart @Validated BrailleOptions brailleOptions,
            @RequestPart MultipartFile user_image)
    {
        return imageToBrailleService.convertImage(user_image, brailleOptions);
    }
}

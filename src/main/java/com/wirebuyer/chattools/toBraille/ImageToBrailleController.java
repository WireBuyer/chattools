package com.wirebuyer.chattools.toBraille;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageToBrailleController {

    private final ImageToBrailleService imageToBrailleService;

    public ImageToBrailleController(ImageToBrailleService imageToBrailleService) {
        this.imageToBrailleService = imageToBrailleService;
    }

    @PostMapping(value = "/brailleConverter")
    @CrossOrigin(origins = "http://localhost:5173")
    public String submit_image(
            @RequestPart @Validated BrailleOptions brailleOptions,
            @RequestPart MultipartFile user_image)
    {
        System.out.println(brailleOptions);
        return imageToBrailleService.convertImage(user_image, brailleOptions);

    }
}

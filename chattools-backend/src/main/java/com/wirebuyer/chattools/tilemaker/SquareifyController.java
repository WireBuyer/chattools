package com.wirebuyer.chattools.tilemaker;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/")
public class SquareifyController {

    private final SquareifyService squareifyService;

    public SquareifyController(SquareifyService squareifyService) {
        this.squareifyService = squareifyService;
    }

    // not exactly sure if i need the "application/zip" part but i'll keep it anyway
    @PostMapping(value = "/tilemaker", produces = "application/zip")
    @CrossOrigin(origins = "*")
    public StreamingResponseBody tilemaker(HttpServletResponse response,
                                           @RequestPart MultipartFile file,
                                           @RequestPart @Validated CropOptions cropOptions) throws IOException {
        // TODO: dynamic vars from request with validation
        System.out.println("file is : " + file.getOriginalFilename() + " and size is: " + file.getSize());
        System.out.println(cropOptions);
        int rows = 2;
        int cols = 2;
        Path zip = squareifyService.processFile(file, rows, cols, false);

        String filename = FilenameUtils.removeExtension(file.getOriginalFilename()) + ".zip";
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

        return outputStream -> {
            try (var inputStream = Files.newInputStream(zip)) {
                inputStream.transferTo(outputStream);
            } finally {
                System.out.println("deleting file " + filename);
                Files.deleteIfExists(zip);
            }
        };
    }
}

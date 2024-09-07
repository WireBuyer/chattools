package com.wirebuyer.chattools.squareify;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/")
public class squareifyController {

    private final SquareifyService squareifyService;

    public squareifyController(SquareifyService squareifyService) {
        this.squareifyService = squareifyService;
    }

    @PostMapping(value = "/squareify", produces = "application/zip")
    public StreamingResponseBody squareify(MultipartFile file, HttpServletResponse response) throws IOException {
        // TODO: dynamic vars from request with validation
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

package com.wirebuyer.chattools.tilemaker;

import com.wirebuyer.chattools.tilemaker.contentStrategies.ContentStrategy;
import com.wirebuyer.chattools.tilemaker.utils.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

@Service
public class SquareifyService {

    private final Map<String, ContentStrategy> contentStrategies;

    public SquareifyService(List<ContentStrategy> contentStrategies) {
        this.contentStrategies = new HashMap<>();
        for (ContentStrategy contentStrategy : contentStrategies) {
            for (String contentType : contentStrategy.getSupportedContentType()) {
                this.contentStrategies.put(contentType, contentStrategy);
            }
        }
    }

    public Path processFile(MultipartFile file, int rows, int cols, boolean resize) throws IOException {
        String filetype = FileUtils.getContentType(file);
        System.out.println("type is: " + filetype);
        if (!contentStrategies.containsKey(filetype)) {
            throw new RuntimeException("doesn't support file type: " + filetype);
        }
        ContentStrategy contentStrategy = getContentStrategy(filetype);

        Path zip = Files.createTempFile(Paths.get("D:\\Media\\4chan\\gifs\\test_gifs"), null, ".zip");
        try (ZipOutputStream zos = new ZipOutputStream(new BufferedOutputStream(Files.newOutputStream(zip)))) {
            contentStrategy.processTiles(file, zos, rows, cols, resize);
        }

        return zip;
    }

    private ContentStrategy getContentStrategy(String filetype) {
        ContentStrategy contentStrategy = contentStrategies.get(filetype);
        if (contentStrategy == null) {
            throw new RuntimeException("Invalid type: " + filetype);
        }
        return contentStrategy;
    }
}
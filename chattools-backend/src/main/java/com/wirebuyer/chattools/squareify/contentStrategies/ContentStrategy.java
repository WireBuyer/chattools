package com.wirebuyer.chattools.squareify.contentStrategies;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

public interface ContentStrategy {

    void processTiles(MultipartFile file, ZipOutputStream zos, int rows, int cols, boolean resize) throws IOException;

    List<String> getSupportedContentType();

    // TODO: add a get tilewidth and height method
}

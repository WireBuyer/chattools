package com.wirebuyer.chattools.squareify.contentStrategies;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Component
public class ImageIOStrategy implements ContentStrategy {
    @Override
    public void processTiles(MultipartFile file, ZipOutputStream zos, int rows, int cols, boolean resize) throws IOException {
        // TODO: add resize code to this
        // determine tile sizes
        BufferedImage image = ImageIO.read(file.getInputStream());
        int tileWidth = image.getWidth() / cols;
        int tileHeight = image.getHeight() / rows;
        System.out.println(image.getWidth() + " " + image.getHeight() + " " + tileWidth + " " + tileHeight);

        // iterate over the rows and cols to crop tiles
        int y = 0;
        for (int row = 0; row < rows; row++) {
            int x = 0;
            for (int col = 0; col < cols; col++) {
                BufferedImage crop = image.getSubimage(x, y, tileWidth, tileHeight);

                // TODO: replace this with a better string method in a fileutils class
                //  make this work with the original format, remake the function perhaps to include that param
                int value = row * cols + col + 1;
                String filename = FilenameUtils.removeExtension(file.getOriginalFilename());
                zos.putNextEntry(new ZipEntry(filename + value + ".png"));

                // TODO: make this get the actual format via tika instead of hardcoding png
                ImageIO.write(crop, "png", zos);
                zos.closeEntry();

                x += tileWidth;
            }
            y += tileHeight;
        }
    }

    @Override
    public List<String> getSupportedContentType() {
        return List.of("image/png", "image/jpg", "image/jpeg");
    }
}

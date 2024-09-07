package com.wirebuyer.chattools.squareify.contentStrategies;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public abstract class CommandlineStrategy implements ContentStrategy {
    @Override
    public void processTiles(MultipartFile file, ZipOutputStream zos, int rows, int cols, boolean resize) throws IOException {
        // TODO: to be moved to an abstract function later for other formats which have other ways of finding sizes
        BufferedImage image = ImageIO.read(file.getInputStream());
        int width = image.getWidth();
        int height = image.getHeight();
        int tileWidth;
        int tileHeight;

        InputStream is;
        // TODO: add better resizing code here if resizing
        if (resize) {
            System.out.println("resizing");
            boolean roundDown = false;
            int newX = roundDimension(width, cols, roundDown);
            int newY = roundDimension(height, rows, roundDown);
            System.out.println("newX: " + newX);
            System.out.println("newY: " + newY);
            is = runProcess(file.getInputStream(), buildResizeCommand(newX, newY));
            tileWidth = newX / cols;
            tileHeight = newY / rows;
        } else {
            is = new BufferedInputStream(file.getInputStream());
            tileWidth = width / cols;
            tileHeight = height / rows;
        }

        int y = 0;
        for (int row = 0; row < rows; row++) {
            int x = 0;
            for (int col = 0; col < cols; col++) {
                // TODO: replace this with a better naming method in a fileutils class
                int value = row * cols + col + 1;
                String filename = FilenameUtils.removeExtension(file.getOriginalFilename());
                zos.putNextEntry(new ZipEntry(filename + value + this.getTypeExtension()));

                is.mark(Integer.MAX_VALUE);
                BufferedInputStream cropInputStream = runProcess(is, buildCropCommand(x, y, tileWidth, tileHeight));
                cropInputStream.transferTo(zos);

                zos.closeEntry();
                x += tileWidth;
                is.reset();
            }
            y += tileHeight;
        }
        is.close();
    }

    private BufferedInputStream runProcess(InputStream is, List<String> command) throws IOException {
        ProcessBuilder pb = new ProcessBuilder(command);
        Process process = pb.start();
        try (var processOutputStream = process.getOutputStream()) {
            // transfer the file to stdin of the process
            is.transferTo(processOutputStream);
        }
        return new BufferedInputStream(process.getInputStream()) {
            private final Process p = process;

            @Override
            public void close() throws IOException {
                super.close();
                // TODO: add proper exceptions and exception handling later
                try {
                    int exitCode = p.waitFor();
                    if (exitCode != 0) {
                        throw new IOException("Process exception - exit code " + exitCode);
                    }
                } catch (InterruptedException e) {
                    throw new RuntimeException("Process was interrupted", e);
                } finally {
                    p.destroyForcibly();
                }
            }
        };
    }

    private int roundDimension(int dimensionSize, int slices, boolean roundDown) {
        int value;
        if (roundDown) {
            value = slices * (dimensionSize / slices);
        } else {
            value = slices * ((dimensionSize + slices - 1) / slices);
        }

        // TODO: keep this here for now and add validation later to reject the request if slices > dimension size
        if (value < slices) {
            value = slices;
        }

        return value;
    }

    protected abstract List<String> buildCropCommand(int x, int y, int tileWidth, int tileHeight);

    protected abstract List<String> buildResizeCommand(int newX, int newY);

    protected abstract String getTypeExtension();
}
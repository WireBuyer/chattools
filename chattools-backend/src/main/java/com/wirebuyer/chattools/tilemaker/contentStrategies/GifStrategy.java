package com.wirebuyer.chattools.tilemaker.contentStrategies;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GifStrategy extends CommandlineStrategy {

    @Override
    protected List<String> buildCropCommand(int x, int y, int tileWidth, int tileHeight) {
        return List.of("gifsicle", "--crop", x + "," + y + "+" + tileWidth + "x" + tileHeight, "-o", "-");
    }

    @Override
    // TODO
    protected List<String> buildResizeCommand(int newX, int newY) {
        return List.of("gifsicle", "--resize", newX + "x" + newY, "-o", "-");
    }

    @Override
    protected String getTypeExtension() {
        return ".gif";
    }

    @Override
    public List<String> getSupportedContentType() {
        return List.of("image/gif");
    }
}

package com.wirebuyer.chattools.tobraille;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class BrailleOptions {

    @Min(value = 2, message = "Value must be at least 2")
    @Max(value = 650, message = "Value must be less than or equal to 650")
    private Integer width = null;

    @Min(value = 2, message = "Value must be at least 2")
    @Max(value = 650, message = "Value must be less than or equal to 650")
    private Integer height = null;

    @Min(value = 0, message = "Value must be between 0 and 255")
    @Max(value = 255, message = "Value must be between 0 and 255")
    private int threshold = 128;

    private boolean inverted = false;

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }

    public boolean isInverted() {
        return inverted;
    }

    public void setInverted(boolean inverted) {
        this.inverted = inverted;
    }

    @Override
    public String toString() {
        return "BrailleOptions{" +
                "width=" + width +
                ", height=" + height +
                ", threshold=" + threshold +
                ", inverted=" + inverted +
                '}';
    }
}

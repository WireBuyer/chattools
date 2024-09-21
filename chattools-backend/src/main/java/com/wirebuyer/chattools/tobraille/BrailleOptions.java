package com.wirebuyer.chattools.tobraille;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BrailleOptions {


    @JsonProperty("width")
    @Min(value = 1, message = "Value must be a positive value")
    @Max(value = 4000, message = "Value must be less than 4000")
    private Integer width = null;

    @JsonProperty("height")
    @Min(value = 1, message = "Value must be a positive value")
    @Max(value = 4000, message = "Value must be less than 4000")
    private Integer height = null;

    @JsonProperty("threshold")
    @JsonSetter(nulls = Nulls.SKIP)
    @Min(value = 0, message = "Value must be between 0 and 255")
    @Max(value = 255, message = "Value must be between 0 and 255")
    private int threshold = 128;

    @JsonProperty("inverted")
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

    public int getThreshold() {
        return threshold;
    }

    public boolean isInverted() {
        return inverted;
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

package com.wirebuyer.chattools.tilemaker;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wirebuyer.chattools.tilemaker.validators.ValidCropOptions;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@JsonIgnoreProperties(ignoreUnknown = true)
@ValidCropOptions
public class CropOptions {

    @JsonProperty("rows")
    @Min(value = 1, message = "Value must be a positive value")
    @Max(value = 7, message = "Value must be less than 8")
    private int rows = 2;

    @JsonProperty("cols")
    @Min(value = 1, message = "Value must be a positive value")
    @Max(value = 7, message = "Value must be less than 8")
    private int cols = 2;

    @JsonProperty("isTrim")
    private boolean isTrim = false;

    @JsonProperty("isDownsize")
    private boolean isDownsize = false;

    @Override
    public String toString() {
        return "CropOptions{" +
                "rows=" + rows +
                ", cols=" + cols +
                ", isTrim=" + isTrim +
                ", isDownsize=" + isDownsize +
                '}';
    }

    public int getRows() {
        return rows;
    }

    public void setRows(@Min(value = 1, message = "Value must be a positive value") @Max(value = 7, message = "Value must be less than 8") int rows) {
        this.rows = rows;
    }

    public int getCols() {
        return cols;
    }
}

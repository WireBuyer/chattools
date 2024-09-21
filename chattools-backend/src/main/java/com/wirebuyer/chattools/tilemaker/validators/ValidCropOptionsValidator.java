package com.wirebuyer.chattools.tilemaker.validators;

import com.wirebuyer.chattools.tilemaker.CropOptions;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidCropOptionsValidator implements ConstraintValidator<ValidCropOptions, CropOptions> {
    @Override
    public boolean isValid(CropOptions cropOptions, ConstraintValidatorContext context) {
        return cropOptions.getRows() != 1 || cropOptions.getCols() != 1;
    }
}

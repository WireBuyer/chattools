package com.wirebuyer.chattools.tilemaker.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ValidCropOptionsValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidCropOptions {
    String message() default "Rows and cols cannot be 1";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
package com.wirebuyer.chattools.tobraille;

import java.util.UUID;

public record AsciiDto(UUID id, String content) {
    public static AsciiDto toDto(Ascii ascii) {
        return new AsciiDto(
                ascii.getId(),
                ascii.getContent()
        );
    }
}

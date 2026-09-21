package com.wirebuyer.chattools.tobraille;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.UUID;

public interface AsciiRepository extends JpaRepository<Ascii, UUID> {
    long countByUserId(long userId);
    Page<Ascii> findByUserId(long userId, Pageable pageable);
    void deleteByUserIdAndIdIn(long userId, Collection<UUID> id);
}

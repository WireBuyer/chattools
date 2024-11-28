package com.wirebuyer.chattools.tobraille;

import com.wirebuyer.chattools.security.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.UUID;

public interface AsciiRepository extends JpaRepository<Ascii, UUID> {
    long countByUser(User user);
    Page<Ascii> findByUser(User user, Pageable pageable);
    void deleteByUserAndIdIn(User user, Collection<UUID> id);
}

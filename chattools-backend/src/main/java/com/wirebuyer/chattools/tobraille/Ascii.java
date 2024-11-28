package com.wirebuyer.chattools.tobraille;

import com.wirebuyer.chattools.security.User;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "asciis", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "content"})
})
public class Ascii {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // this works with the current limit of 650w 650h (max 53138). adjust this as needed
    @Column(length = 55000)
    private String content;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UUID getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

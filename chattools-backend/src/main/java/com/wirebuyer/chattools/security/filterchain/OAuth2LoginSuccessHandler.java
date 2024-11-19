package com.wirebuyer.chattools.security.filterchain;

import com.wirebuyer.chattools.security.User;
import com.wirebuyer.chattools.security.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    public OAuth2LoginSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String provider_id = oauth2User.getAttribute("sub");
        String username = oauth2User.getAttribute("preferred_username");

        // create users if they don't exist or update their name if it was changed
        userRepository.findByProviderId(provider_id).ifPresentOrElse(
                exisitingUser -> {
                    System.out.println("User found: " + exisitingUser);
                    if (!exisitingUser.getUsername().equals(username)) {
                        exisitingUser.setUsername(username);
                        userRepository.save(exisitingUser);
                    }
                },
                () -> {
                    User user = new User();
                    user.setProviderId(provider_id);
                    user.setUsername(username);
                    userRepository.save(user);
                    System.out.println("User added: " + user);
                }
        );

        response.sendRedirect("/");
    }
}
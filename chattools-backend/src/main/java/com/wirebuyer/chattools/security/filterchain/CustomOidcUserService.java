package com.wirebuyer.chattools.security.filterchain;

import com.wirebuyer.chattools.security.User;
import com.wirebuyer.chattools.security.UserRepository;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
public class CustomOidcUserService extends OidcUserService {

    private final UserRepository userRepository;

    public CustomOidcUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);

        String providerId = oidcUser.getAttribute("sub");
        String username = oidcUser.getAttribute("preferred_username");

        User user = userRepository.findByProviderId(providerId)
                .map(existingUser -> {
                    if (!existingUser.getUsername().equals(username)) {
                        existingUser.setUsername(username);
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                }).orElseGet(() -> {
                    User newUser = new User();
                    newUser.setProviderId(providerId);
                    newUser.setUsername(username);

                    return userRepository.save(newUser);
                });

        return new CustomOidcUser(oidcUser, user.getId());
    }
}

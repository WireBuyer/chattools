package com.wirebuyer.chattools.security.filterchain;

import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

public class CustomOidcUser extends DefaultOidcUser {
    private final long dbId;

    public CustomOidcUser(OidcUser oidcUser, long dbId) {
        super(oidcUser.getAuthorities(), oidcUser.getIdToken());
        this.dbId = dbId;
    }

    public long getDbId() {
        return dbId;
    }
}

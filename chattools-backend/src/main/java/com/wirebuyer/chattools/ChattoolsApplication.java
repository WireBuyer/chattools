package com.wirebuyer.chattools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChattoolsApplication {
    /* TODO:
        add better support for transparency
        move this list to github
        add docker support
        add exceptions
        add oauth signin via twitch to keep history
        add better cors and csrf setup
        add keycloak integration
        see if there's any need for validators
        allow signup with user/pass too
        need a login page too or a popup thing
        add a user profile page
        think of more tools
        add tests
     */
    public static void main(String[] args) {
        System.out.println(System.getProperty("java.version"));
        SpringApplication.run(ChattoolsApplication.class, args);
    }

}

package com.wirebuyer.chattools;

import com.twelvemonkeys.servlet.image.IIOProviderContextListener;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// According to the webp plugin docs, we require this listener in web.xml. Since spring boot doesn't use web.xml,
// we can programmatically register the class
@Configuration
public class IIOProviderListenerRegistrar extends SpringBootServletInitializer {

    @Bean
    public IIOProviderContextListener registerIIOProviderContextListener () {
        return new IIOProviderContextListener();
    }
}

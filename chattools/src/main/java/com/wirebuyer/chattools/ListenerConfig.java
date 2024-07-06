package com.wirebuyer.chattools;

import jakarta.servlet.ServletContextListener;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


// TODO: delete this file later
@Configuration
public class ListenerConfig {

    private final ApplicationContext context;

    public ListenerConfig(ApplicationContext context) {
        this.context = context;
    }

    @Bean
    public ApplicationRunner printListeners() {
        return args -> {
            String[] listenerBeanNames = context.getBeanNamesForType(ServletContextListener.class);
            for (String beanName : listenerBeanNames) {
                ServletContextListener listener = context.getBean(beanName, ServletContextListener .class);
                System.out.println("Registered listener: " + listener.getClass().getName());
            }
        };
    }
}


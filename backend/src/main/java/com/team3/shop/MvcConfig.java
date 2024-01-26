package com.team3.shop;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Files;
import java.nio.file.Paths;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    @Value("${app.uploads.location}")
    private String uploadsLocation;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        if (!Files.exists(Paths.get(uploadsLocation))) {
            throw new StorageLocationNotFoundException("\n\n\n ERROR: Uploads location not found: " + uploadsLocation + ". " +
                    "Please set the app.uploads.location value in application.properties to point to your 'backend/uploads' directory. \n" +
                    "Alternatively, you can comment out this check in McvConfig.java. " +
                            "Images will not load and you will not be able to edit or add products via the dashboard."
                    + "\n\n\n");
        }

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadsLocation);
    }
}

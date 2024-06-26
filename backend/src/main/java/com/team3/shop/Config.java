package com.team3.shop;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class Config {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public static CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("POST", "GET", "PUT", "DELETE", "HEAD", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/users/sign-up", configuration);
        source.registerCorsConfiguration("/authenticate", configuration);
        source.registerCorsConfiguration("/products/", configuration);
        source.registerCorsConfiguration("/products/{id}", configuration);
        source.registerCorsConfiguration("/api/buyer-information/", configuration);
        source.registerCorsConfiguration("/api/buyer-information/paypal", configuration);
        source.registerCorsConfiguration("/api/buyer-information/paypal/{cartId}", configuration);
        source.registerCorsConfiguration("/api/buyer-information/{id}", configuration);
        source.registerCorsConfiguration("/api/cart/cart-products", configuration);
        source.registerCorsConfiguration("/api/cart/product", configuration);
        source.registerCorsConfiguration("/api/cart/cart-products/{cartProductId}", configuration);


        return source;
    }
}

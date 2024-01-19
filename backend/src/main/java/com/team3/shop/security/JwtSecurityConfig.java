package com.team3.shop.security;

import com.team3.shop.ShopApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.team3.shop.security.JwtUserDetailsService.USER;


@Configuration
public class JwtSecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public AuthenticationManager authenticationManager(
            final AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/authenticate", "/users/sign-up").permitAll()
                        .anyRequest().hasAuthority(USER))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        // Assuming you have a CorsConfigurationSource bean defined elsewhere
        http.cors(cors -> cors.configurationSource(ShopApplication.corsConfigurationSource()));

        // Apply CSRF configuration if you are not disabling it, or remove this line if you are
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }

}

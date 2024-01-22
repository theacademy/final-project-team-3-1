package com.team3.shop.dto;

import org.springframework.beans.factory.config.CustomEditorConfigurer;

public class CartDto {
    private Long id;
    private Long userId;
    private String status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}


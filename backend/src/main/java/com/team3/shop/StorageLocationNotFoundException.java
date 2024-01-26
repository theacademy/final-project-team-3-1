package com.team3.shop;

public class StorageLocationNotFoundException extends RuntimeException {
    public StorageLocationNotFoundException(String message) {
        super(message);
    }
}

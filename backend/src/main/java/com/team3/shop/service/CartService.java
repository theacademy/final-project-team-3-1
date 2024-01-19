package com.team3.shop.service;

import com.team3.shop.dto.CartDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    List<CartDto> getAllItems();
    CartDto getItemById(Long itemId);
    void addItem(CartDto item);
    void removeItem(Long itemId);
}

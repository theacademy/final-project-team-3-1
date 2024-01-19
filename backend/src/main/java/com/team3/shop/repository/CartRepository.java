package com.team3.shop.repository;

import com.team3.shop.dto.CartDto;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CartRepository {
    List<CartDto> getAllItems();
    CartDto getItemById(Long itemId);
    void addItem(CartDto item);
    void removeItem(Long itemId);
}


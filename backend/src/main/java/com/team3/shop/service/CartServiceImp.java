package com.team3.shop.service;

import com.team3.shop.dto.CartDto;
import com.team3.shop.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CartServiceImp implements CartService {
    private final CartRepository cartRepository;

    // Constructor
    public CartServiceImp(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public List<CartDto> getAllItems() {
        return cartRepository.getAllItems();
    }

    @Override
    public CartDto getItemById(Long itemId) {
        return cartRepository.getItemById(itemId);
    }

    @Override
    public void addItem(CartDto item) {
        cartRepository.addItem(item);
    }

    @Override
    public void removeItem(Long itemId) {
        cartRepository.removeItem(itemId);
    }
}

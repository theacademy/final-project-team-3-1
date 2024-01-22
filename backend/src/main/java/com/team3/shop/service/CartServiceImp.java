package com.team3.shop.service;

import com.team3.shop.dto.CartDto;
import com.team3.shop.model.Cart;
import com.team3.shop.model.CartProduct;
import com.team3.shop.model.Product;
import com.team3.shop.repository.CartProductRepository;
import com.team3.shop.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CartServiceImp {
    private final CartRepository cartRepository;

    // Constructor
    public CartServiceImp(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<CartDto> getAllItems() {
        return cartRepository.getAllItems();
    }


    public CartDto getItemById(Long itemId) {
        return cartRepository.getItemById(itemId);
    }


    public void removeItem(Long itemId) {
        cartRepository.removeItem(itemId);
    }
}

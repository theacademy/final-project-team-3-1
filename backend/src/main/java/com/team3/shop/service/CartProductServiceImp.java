package com.team3.shop.service;

import com.team3.shop.dto.CartProductDto;
import com.team3.shop.model.CartProduct;
import com.team3.shop.repository.CartProductRepository;
import com.team3.shop.repository.CartRepository;

public class CartProductServiceImp {

    private final CartProductRepository cartProductRepository;

    // Constructor
    public CartProductServiceImp(CartProductRepository cartProductRepository) {
        this.cartProductRepository = cartProductRepository;
    }
    public void addItemToCart(CartProductDto cartProductDto) {
        cartProductRepository.saveItem(cartProductDto);

    }
}

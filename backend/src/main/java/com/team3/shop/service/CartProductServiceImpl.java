package com.team3.shop.service;

import com.team3.shop.dto.CartProductDto;
import com.team3.shop.model.CartProduct;
import com.team3.shop.repository.CartProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartProductServiceImpl {

    private final CartProductRepository cartProductRepository;

    // Constructor
    public CartProductServiceImpl(CartProductRepository cartProductRepository) {
        this.cartProductRepository = cartProductRepository;
    }
    public void addItemToCart(CartProductDto cartProductDto) {
        CartProduct cartProduct = new CartProduct();
        cartProduct.setCart_id(cartProductDto.getCartId());
        cartProduct.setProduct_id(cartProductDto.getProductId());
        cartProductRepository.save(cartProduct);
    }

    public List<CartProduct> getAllItems() {
        return cartProductRepository.findAll();
    }


    public CartProduct getItemById(Long itemId) {
        return cartProductRepository.findById(itemId).orElseThrow();
    }


    public void removeItem(Long itemId) {
        CartProduct cartProductToDelete = cartProductRepository.findById(itemId).orElseThrow();
        cartProductRepository.delete(cartProductToDelete);
    }


}

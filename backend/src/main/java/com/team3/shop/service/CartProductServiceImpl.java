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
        if (cartProductDto.getCartId() != null) {
            CartProduct cartProduct = new CartProduct();
            cartProduct.setCart_id(cartProductDto.getCartId());
            cartProduct.setProduct_id(cartProductDto.getProductId());
            cartProductRepository.save(cartProduct);
        } else {
            // Handle the case where cartId is null
            // For now, we'll print a message to the console.
            System.out.println("Attempted to add item to cart with null cartId.");
            // You might want to throw an exception or handle it based on your application logic.
        }
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

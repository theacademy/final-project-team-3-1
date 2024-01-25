package com.team3.shop.service;

import com.team3.shop.dto.CartProductDto;
import com.team3.shop.model.Cart;
import com.team3.shop.model.CartProduct;
import com.team3.shop.model.Product;
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

    public void addItemToCart(Cart cart, Product product) {
        CartProduct cartProduct = new CartProduct(cart, product);
        cartProductRepository.save(cartProduct);
    }


    public List<CartProduct> getAllCartProducts(Cart cart) {
        return cartProductRepository.findByCartId(cart.getId());
    }


    public CartProduct getItemById(Long itemId) {
        return cartProductRepository.findById(itemId).orElseThrow();
    }


    public void removeCartProduct(Long cartProductId) {
        CartProduct cartProductToDelete = cartProductRepository.findById(cartProductId).orElseThrow();
        cartProductRepository.delete(cartProductToDelete);
    }
}

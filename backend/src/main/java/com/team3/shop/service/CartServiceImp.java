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

    public CartServiceImp(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public void checkoutCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElse(null);

        // Check if the cart exists
        if (cart != null) {
            // Update the cart status to 'Ordered'
            cart.setStatus("Ordered");

            // Save the updated cart
            cartRepository.save(cart);
        } else {
            // Handle case where the cart with the given ID is not found

        }
    }

}

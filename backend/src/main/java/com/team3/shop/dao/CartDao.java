package com.team3.shop.dao;

import com.team3.shop.dto.CartDto;
import com.team3.shop.model.Cart;

import java.util.List;

public interface CartDao {
    List<Cart> getAllCarts();
    Cart getCartById(Long cartId);
    void createCart(Cart cart);
    void updateCart(Cart cart);
    void deleteCart(Long cartId);
}

package com.team3.shop.dao;

import com.team3.shop.dto.CartDto;
import com.team3.shop.model.Cart;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class CartDaoImpl implements CartDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Cart> getAllCarts() {
        return entityManager.createQuery("FROM Cart", Cart.class).getResultList();
    }

    @Override
    public Cart getCartById(Long cartId) {
        return entityManager.find(Cart.class, cartId);
    }

    @Override
    public void createCart(Cart cart) {
        entityManager.persist(cart);
    }

    @Override
    public void updateCart(Cart cart) {
        entityManager.merge(cart);
    }

    @Override
    public void deleteCart(Long cartId) {
        Cart cart = entityManager.find(Cart.class, cartId);
        if (cart != null) {
            entityManager.remove(cart);
        }
    }
}
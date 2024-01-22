package com.team3.shop.repository;

import com.team3.shop.model.Cart;
import com.team3.shop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {}

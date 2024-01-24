package com.team3.shop.repository;

import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.CartProductDto;
import com.team3.shop.model.CartProduct;
import com.team3.shop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
    List<CartProduct> findByProductId(long productId);
}

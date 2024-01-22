package com.team3.shop.repository;

import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.CartProductDto;
import com.team3.shop.model.CartProduct;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CartProductRepository {
    void saveItem(CartProductDto item);
    void removeItem(CartProductDto item);
}


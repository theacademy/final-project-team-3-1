package com.team3.shop.controller;



import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.CartProductDto;
import com.team3.shop.service.CartProductServiceImp;
import com.team3.shop.service.CartServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartServiceImp cartServiceImp;
    private final CartProductServiceImp cartProductServiceImp;

    // Constructor
    public CartController(CartServiceImp cartServiceImp, CartProductServiceImp cartProductServiceImp) {
        this.cartServiceImp = cartServiceImp;
        this.cartProductServiceImp = cartProductServiceImp;
    }

//    @GetMapping("/items")
//    public List<CartProductDto> getAllItems() {
//        // TODO: make dtos from entities
//        return cartProductServiceImp.getAllItems();
//    }
//
//    @GetMapping("/items/{itemId}")
//    public CartDto getItemById(@PathVariable Long itemId) {
//        // TODO: make dto from entity
//        return cartProductServiceImp.getItemById(itemId);
//    }

    @PostMapping("/items")
    public ResponseEntity<Void> addItemToCart(@RequestBody CartProductDto cartItem) {
        cartProductServiceImp.addItemToCart(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/items/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartProductServiceImp.removeItem(itemId);
    }
}


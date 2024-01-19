package com.team3.shop.controller;



import com.team3.shop.dto.CartDto;
import com.team3.shop.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    // Constructor
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/items")
    public List<CartDto> getAllItems() {
        return cartService.getAllItems();
    }

    @GetMapping("/items/{itemId}")
    public CartDto getItemById(@PathVariable Long itemId) {
        return cartService.getItemById(itemId);
    }

    @PostMapping("/items")
    public void addItem(@RequestBody CartDto item) {
        cartService.addItem(item);
    }

    @DeleteMapping("/items/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
    }
}


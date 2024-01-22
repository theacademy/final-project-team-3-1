package com.team3.shop.controller;



import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.CartProductDto;
import com.team3.shop.dto.ProductDto;
import com.team3.shop.service.CartProductServiceImpl;
import com.team3.shop.service.CartServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartServiceImp cartServiceImp;
    private final CartProductServiceImpl cartProductServiceImpl;

    // Constructor
    public CartController(CartServiceImp cartServiceImp, CartProductServiceImpl cartProductServiceImpl) {
        this.cartServiceImp = cartServiceImp;
        this.cartProductServiceImpl = cartProductServiceImpl;
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
    public ResponseEntity<Void> addItemToCart(@RequestBody ProductDto productItem, @RequestBody CartDto cartDto) {
        CartProductDto cartProductDto = new CartProductDto();
        cartProductDto.setCartId(cartDto.getId());
        cartProductDto.setProductId(productItem.getId());
        cartProductServiceImpl.addItemToCart(cartProductDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/items/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartProductServiceImpl.removeItem(itemId);
    }
}


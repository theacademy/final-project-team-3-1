package com.team3.shop.controller;



import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.CartProductDto;
import com.team3.shop.dto.ProductDto;
import com.team3.shop.model.Cart;
import com.team3.shop.model.CartProduct;
import com.team3.shop.model.Product;
import com.team3.shop.model.User;
import com.team3.shop.repository.CartProductRepository;
import com.team3.shop.repository.CartRepository;
import com.team3.shop.repository.ProductRepository;
import com.team3.shop.repository.UserRepository;
import com.team3.shop.service.CartProductServiceImpl;
import com.team3.shop.service.CartServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    private final CartServiceImp cartServiceImp;
    private final CartProductServiceImpl cartProductServiceImpl;

    // Constructor
    public CartController(CartServiceImp cartServiceImp, CartProductServiceImpl cartProductServiceImpl) {
        this.cartServiceImp = cartServiceImp;
        this.cartProductServiceImpl = cartProductServiceImpl;
    }

    @GetMapping("/cart-products")
    public List<CartProductDto> getAllActiveCartProducts() {
        Cart activeCart = cartServiceImp.getUserActiveCart(getAuthenticatedUser());
        List<CartProduct> cartProducts = cartProductServiceImpl.getAllCartProducts(activeCart);
        List<CartProductDto> cartProductDtos = new ArrayList<>();
        for (CartProduct cartProduct : cartProducts) {
            cartProductDtos.add(new CartProductDto(cartProduct));
        }
        return cartProductDtos;
    }
    
//

    @PostMapping("/product")
    public ResponseEntity<Void> addItemToCart(@RequestBody ProductDto productItem) {
        Cart activeCart = cartServiceImp.getUserActiveCart(getAuthenticatedUser());
        Product product = productRepository.findById(productItem.getId()).orElseThrow();
        cartProductServiceImpl.addItemToCart(activeCart, product);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/cart-products/{cartProductId}")
    public void remove(@PathVariable Long cartProductId) {
        cartProductServiceImpl.removeCartProduct(cartProductId);
        return;
    }

    public User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepository.findByEmail(username).orElseThrow();
        } else {
            throw new RuntimeException();
        }
    }
}


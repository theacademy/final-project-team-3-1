package com.team3.shop.controller;



import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.CartProductDto;
import com.team3.shop.dto.ProductDto;
import com.team3.shop.model.Cart;
import com.team3.shop.model.CartProduct;
import com.team3.shop.model.Product;
import com.team3.shop.model.User;
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
private CartRepository cartRepository;
@Autowired
private ProductRepository productRepository;

    private final CartServiceImp cartServiceImp;
    private final CartProductServiceImpl cartProductServiceImpl;

    // Constructor
    public CartController(CartServiceImp cartServiceImp, CartProductServiceImpl cartProductServiceImpl) {
        this.cartServiceImp = cartServiceImp;
        this.cartProductServiceImpl = cartProductServiceImpl;
    }
    @GetMapping("/items")
    public List<ProductDto> getAllItems() {
        ArrayList<ProductDto> productDtos = new ArrayList<>();
        for (CartProduct p: cartProductServiceImpl.getAllItems()){
            Product product = productRepository.findById(p.getProduct_id()).get();
            ProductDto productDto = new ProductDto(product);
            productDtos.add(productDto);
        }
        return productDtos;
    }
    
//

    @PostMapping("/items")
    public ResponseEntity<Void> addItemToCart(@RequestBody ProductDto productItem) {
        CartDto cartDto = new CartDto();
        CartProductDto cartProductDto = new CartProductDto();
        Long userId = getAuthenticatedUser().getId();
        List<Cart> allCarts = cartRepository.findByUserId(userId);
        for(Cart c : allCarts){
            if(c.getStatus().equals("active")){
                cartDto.setId(c.getId());
                break;
            }
        }
        cartProductDto.setCartId(cartDto.getId());
        cartProductDto.setProductId(productItem.getId());
        cartProductServiceImpl.addItemToCart(cartProductDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @DeleteMapping("/items/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartProductServiceImpl.removeItem(itemId);
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


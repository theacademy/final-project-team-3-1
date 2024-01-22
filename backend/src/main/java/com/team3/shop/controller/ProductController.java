package com.team3.shop.controller;

import com.team3.shop.dto.ProductDto;
import com.team3.shop.model.Product;
import com.team3.shop.model.Seller;
import com.team3.shop.model.User;
import com.team3.shop.repository.ProductRepository;
import com.team3.shop.repository.UserRepository;
import com.team3.shop.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        Seller seller = getAuthenticatedUser().getSeller();
        productDto.setSeller(seller);
        Product product = productService.createProduct(productDto);
        ProductDto responseDto = new ProductDto(product);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{id}")
    public ProductDto getProductByID(@PathVariable Long id){
        return productService.getProductById(id);
    }
    @GetMapping("/")
    public List<ProductDto> getAllProducts(){
        return productService.getAllProducts();
    }

    // Update an existing product
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        try {
            productService.updateProduct(id, productDto);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Product updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error updating product: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Delete a product by ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
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

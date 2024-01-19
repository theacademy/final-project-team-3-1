package com.team3.shop.controller;

import com.team3.shop.dto.ProductDto;
import com.team3.shop.model.Product;
import com.team3.shop.repository.ProductRepository;
import com.team3.shop.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/create")
    public void createProduct(@RequestBody ProductDto ProductDto) {
        productService.createProduct(ProductDto);
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
    public void updateProduct(@PathVariable Long id, @RequestBody ProductDto ProductDto) {
        productService.updateProduct(id, ProductDto);
    }

    // Delete a product by ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

}
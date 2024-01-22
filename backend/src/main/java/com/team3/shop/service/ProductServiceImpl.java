package com.team3.shop.service;

import com.team3.shop.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.team3.shop.dto.ProductDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.team3.shop.repository.ProductRepository;

@Service
public class ProductServiceImpl  {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(ProductDto::new) // Assuming you have a constructor in ProductDTO that takes a Product as a parameter
                .collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        // Use Optional to handle null cases
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.map(ProductDto::new).orElse(null);
    }

    @Transactional
    public Product createProduct(ProductDto productDTO) {
        Product product = new Product(productDTO);
        return productRepository.saveAndFlush(product);
    }

    @Transactional
    public void updateProduct(Long id, ProductDto productDTO) {
        // Check if the product with the given ID exists
        Product existingProduct = productRepository.findById(id).orElseThrow();

        // Update fields based on productDTO
        existingProduct.setName(productDTO.getName());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setImageUrl(productDTO.getImageUrl());
        existingProduct.setDescription(productDTO.getDescription());

        // Save the updated product
        productRepository.saveAndFlush(existingProduct);

        // Handle the case where the product doesn't exist (throw an exception or handle as needed)
    }

    @Transactional
    public void deleteProduct(Long id) {
        // Check if the product with the given ID exists
        if (productRepository.existsById(id)) {
            // Delete the product
            productRepository.deleteById(id);
        }
        // Handle the case where the product doesn't exist (throw an exception or handle as needed)
    }

//    @Override
//    public List<ProductDto> getProductsBySearch(String search) {
//        return null;
//    }
}

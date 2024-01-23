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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<ProductDto> createProduct(
            @RequestParam("name") String name,
            @RequestParam("price") BigDecimal price,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) throws IOException {

        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

        Path path = Paths.get("uploads/" + fileName);

        Files.copy(image.getInputStream(), path);

        ProductDto productDto = new ProductDto();
        productDto.setName(name);
        productDto.setPrice(price);
        productDto.setDescription(description);
        productDto.setImageUrl(path.toString());

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
    public List<ProductDto> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        Collections.reverse(products);
        return products;
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                           @RequestParam("name") String name,
                                           @RequestParam("price") BigDecimal price,
                                           @RequestParam("description") String description,
                                           @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            ProductDto productDto = new ProductDto();
            productDto.setName(name);
            productDto.setPrice(price);
            productDto.setDescription(description);

            if (image != null && !image.isEmpty()) {
                // Save the image and set its path to productDto
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path path = Paths.get("uploads/" + fileName);
                Files.copy(image.getInputStream(), path);

                productDto.setImageUrl(path.toString());
            }

            productService.updateProduct(id, productDto);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Product updated successfully");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error saving image: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error updating product: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

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

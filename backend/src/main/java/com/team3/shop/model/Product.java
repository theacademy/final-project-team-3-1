package com.team3.shop.model;

import com.team3.shop.dto.ProductDto;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
    @Table(name = "products")
    public class Product {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;
    
        @Column(name = "name")
        private String name;
    
        @Column(name = "price")
        private BigDecimal price;
    
        @Column(name = "image_url")
        private String imageUrl;

        @Column(name = "description")
        private String description;

        @ManyToOne
        @JoinColumn(name = "seller_id")
        private Seller seller;
    
        public Product() {
        }

        public Product(ProductDto productDto) {
            this.id = productDto.getId();
            this.name = productDto.getName();
            this.price = productDto.getPrice();
            this.imageUrl = productDto.getImageUrl();
            this.description = productDto.getDescription();
            this.seller = productDto.getSeller();
        }

        public Long getId() {
            return id;
        }
        public void setId(Long id) {
            this.id = id;
        }
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public BigDecimal getPrice() {
            return price;
        }
        public void setPrice(BigDecimal price) {
            this.price = price;
        }
        public String getImageUrl() {
            return imageUrl;
        }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
        public Seller getSeller() {
            return seller;
        }
        public void setSeller(Seller seller) {
            this.seller = seller;
        }
        
    }

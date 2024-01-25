package com.team3.shop.dto;

import com.team3.shop.model.CartProduct;

public class CartProductDto  {
    private Long id;
    private CartDto cart;
    private ProductDto product;

    public CartProductDto(CartProduct cartProduct) {
        this.id = cartProduct.getId();
        this.cart = new CartDto(cartProduct.getCart());
        this.product = new ProductDto(cartProduct.getProduct());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CartDto getCart() {
        return cart;
    }

    public void setCart(CartDto cart) {
        this.cart = cart;
    }

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }
}

package com.team3.shop.dto;

public class CartProductDto  {
    private Long id;
    private Long cartId;
    private Long productId;



public CartProductDto(Long id, long cartId, long productId) {
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
}

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}

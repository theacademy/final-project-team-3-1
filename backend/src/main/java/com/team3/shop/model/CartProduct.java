package com.team3.shop.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_products")
public class CartProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="cart_id")
    private long cart_id;
    @Column(name="product_id")
    private long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getCart_id() {
        return cart_id;
    }

    public void setCart_id(long cart_id) {
        this.cart_id = cart_id;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long product_id) {
        this.productId = product_id;
    }

    @Override
    public String toString() {
        return "CartProduct{" +
                "id=" + id +
                ", cart_id=" + cart_id +
                ", productId=" + productId +
                '}';
    }
}

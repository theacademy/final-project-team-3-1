DROP DATABASE IF EXISTS shop;

CREATE DATABASE shop;
USE shop;

CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    seller_id int,
    KEY seller_id (seller_id),
    PRIMARY KEY (id)
);

CREATE TABLE addresses(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(64) NOT NULL,
    zipcode varchar(32) NOT NULL,
    PRIMARY KEY (id),
    KEY user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE sellers(
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

CREATE TABLE products(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url varchar(255) NOT NULL,
    seller_id int NOT NULL,
    PRIMARY KEY (id),
    KEY seller_id (seller_id),
    FOREIGN KEY (seller_id) REFERENCES sellers (id)
);

CREATE TABLE carts(
    id int NOT NULL AUTO_INCREMENT,
    status varchar(25),
    PRIMARY KEY (id)
);

CREATE TABLE cart_products(
    id int NOT NULL AUTO_INCREMENT,
    cart_id int NOT NULL,
    product_id int NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts (id),
    FOREIGN KEY (cart_id) REFERENCES products (id),
    PRIMARY KEY (id)
);


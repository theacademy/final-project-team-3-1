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
    description varchar(255),
    seller_id int NOT NULL,
    PRIMARY KEY (id),
    KEY seller_id (seller_id),
    FOREIGN KEY (seller_id) REFERENCES sellers (id)
);

CREATE TABLE carts(
    id int NOT NULL AUTO_INCREMENT,
    status varchar(25),
    user_id int NOT NULL,
    PRIMARY KEY (id),
    KEY user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE cart_products(
    id int NOT NULL AUTO_INCREMENT,
    cart_id int NOT NULL,
    product_id int NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts (id),
    FOREIGN KEY (cart_id) REFERENCES products (id),
    PRIMARY KEY (id)
);

-- data

INSERT INTO sellers (id) VALUES
    (1);

INSERT INTO products (id, name, price, image_url, description, seller_id) VALUES
    (1, 'Untitled', 600.00, 'https://cdn.dribbble.com/userupload/10564178/file/original-1344b65403b6787b07998a9fe93cc577.jpg?resize=512x384', '', 1),
    (2, 'Sanborn Avenue', 1100.00, 'https://cdn.dribbble.com/users/648290/screenshots/6161272/media/385e000b8732228c7844a119de9ae3a6.jpg?resize=512x354', '', 1),
    (3, 'South Africa', 2250.00, 'https://cdn.dribbble.com/users/59947/screenshots/3479596/dribbb.jpg?resize=512x284', '', 1),
    (4, 'Ash Cave', 600.00, 'https://cdn.dribbble.com/userupload/3266648/file/original-b12e684944557e005eb351e3ba59e06e.jpg?resize=752x', '', 1),
    (5, 'Nebula', 300.00, 'https://cdn.dribbble.com/users/69311/screenshots/4927396/crab-nebula.jpg?resize=800x600', '', 1);

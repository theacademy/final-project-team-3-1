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
    FOREIGN KEY (product_id) REFERENCES products (id),
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

insert into products (id, name, price, image_url, description, seller_id)
values  (6, 'Silk and Jewels', 28000.00, 'uploads/1a674afb-b488-49de-940a-a5166e2e07b4_sj.png', 'Clare Kirkconnell, 2022

Beads, embroidery thread and oil on canvas
', 1),
        (7, 'The Win Party', 9200.00, 'uploads/0da5d033-f104-495d-9643-e6fbed1cf1cb_sc.png', 'Scout Cosner, 2023-2024', 1),
        (8, 'Ectocarpus #1', 15000.00, 'uploads/00a01832-6f98-4432-b521-0a43c358bc8c_jn.png', 'Josèfa Ntjam, 2023

Photomontage printed by sublimation on aluminium, metal frame', 1),
        (9, 'Insomnia', 450.00, 'uploads/dde789af-e93d-4631-ba25-f79b784c16e3_jz.png', 'Jesse Zuo, 2023

Oil on panel
', 1),
        (10, 'River', 850.00, 'uploads/21d1117a-f935-4949-a8af-7dee58f3c5b8_b.png', 'Natalia Roman, 2023

Acrylic on Watercolor Paper', 1),
        (11, 'Egg and Gun', 13000.00, 'uploads/bcd57021-3ba9-47ca-86ac-112e3db0e0de_ll.png', 'Louise Lawler, 2018

Digital Fujiflex chromogenic print face mounted to Plexiglas on museum box
', 1),
        (12, 'Ohne Titel/Untitled', 32000.00, 'uploads/9b3ee584-4e87-4d70-b4b2-1fe44f4fc14a_pf.png', 'Peter Fischli & David Weiss, 1997.', 1),
        (13, 'Recalling Frames', 1000.00, 'uploads/0fd54529-f107-4327-b27a-dab328a8d224_dm.png', 'David Maljkovic, 2010', 1),
        (14, 'Scrapped (Times Square)', 8000.00, 'uploads/a7a42a8b-ac00-4f2e-a8bf-f55004decda2_as.png', 'Analía Saban, 2014

Gelatin silver print on resin coated paper', 1),
        (15, 'Untitled', 800.00, 'uploads/daba51d2-0a93-4aa4-96b7-19a75b3508ba_ak.png', 'Astrid Klein, 2002

Scannerchrom, acrylic on canvas', 1),
        (16, 'DOGE PALACE', 10000.00, 'uploads/73b37941-4593-45a8-85b8-88e61f2bf475_dp.jpg', 'Mario Basner, 2019

ACRYLIC-MOUNTED ARCHIVAL PIGMENT PRINT WITH RECESSED FLOAT FRAME
', 1),
        (17, 'OCULUS WAVE', 2000.00, 'uploads/45b3ac14-1f5b-472c-bf41-88e9cdabcede_ow.jpg', 'Mario Basner, 2015.

ACRYLIC-MOUNTED ARCHIVAL PIGMENT PRINT WITH RECESSED FLOAT FRAME', 1),
        (18, 'TOMORROW', 13000.00, 'uploads/e69be582-2bc1-4a6c-a875-dda11a2dadab_tm.webp', 'Mario Basner, 2015.

ACRYLIC-MOUNTED ARCHIVAL PIGMENT PRINT WITH RECESSED FLOAT FRAME', 1),
        (19, 'ELBTUNNEL', 4000.00, 'uploads/bac06be9-0527-4300-ae04-8bc0657b5bc0_eb.jpg', 'Mario Basner, 2015.

ACRYLIC-MOUNTED ARCHIVAL PIGMENT PRINT WITH RECESSED FLOAT FRAME', 1),
        (20, 'TEA HOUSE', 11000.00, 'uploads/2689fe3b-7008-4030-8e19-02f690e3ee33_th.webp', 'Mario Basner, 2015

ACRYLIC-MOUNTED ARCHIVAL PIGMENT PRINT WITH RECESSED FLOAT FRAME', 1);

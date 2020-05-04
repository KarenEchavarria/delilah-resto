-- comands used to create database and tables

CREATE DATABASE IF NOT EXISTS delilah_test1; 

CREATE TABLE delilah_test1.Users(
    user_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    phone INT UNSIGNED ZEROFILL NOT NULL,
    address VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    role TINYINT(2) NOT NULL
    UNIQUE (user_name)
);

CREATE TABLE delilah_test1.Products(
    user_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_code VARCHAR(250) NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    price DOUBLE NOT NULL,
    UNIQUE (product_code)
);

CREATE TABLE delilah_test1.roles(
    role VARCHAR(30) NOT NULL,
    resources_id TINYINT(3) UNSIGNED ZEROFILL NOT NULL,
    Create_One BOOLEAN NOT NULL,
    Read_One BOOLEAN NOT NULL,
    Write_One BOOLEAN NOT NULL,
    Delete_One BOOLEAN NOT NULL,
    PRIMARY KEY (role, resources_id) USING BTREE;
); 

INSERT INTO roles VALUES ('admin', 'orders', 1, 1, 1, 0);
INSERT INTO roles VALUES ('admin', 'products', 1, 1, 1, 1);
INSERT INTO roles VALUES ('admin', 'users', 1, 1, 1, 1);
INSERT INTO roles VALUES ('client', 'orders', 1, 0, 0, 0);
INSERT INTO roles VALUES ('client', 'products', 0, 1, 0, 0);
INSERT INTO roles VALUES ('client', 'users', 0, 0, 0, 0);


CREATE TABLE delilah_test1.orders(
    order_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    order_date TIMESTAMP NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'nuevo' CHECK (order_status in ('nuevo', 'confirmado', 'preparando', 'enviando', 'entregado', 'cancelado')),
    payment VARCHAR(50) NOT NULL CHECK (payment in ('efectivo', 'tarjeta')),
    user_id INT  UNSIGNED ZEROFILL NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE delilah_test1.ordered_products(
    ordered_products_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    quantity INT UNSIGNED ZEROFILL NOT NULL,
    product_id INT UNSIGNED NOT NULL
)









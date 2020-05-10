-- comands used to create database and tables

CREATE DATABASE IF NOT EXISTS 20NPxAlTA5; 

CREATE TABLE users(
    user_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    NAME VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    phone INT UNSIGNED ZEROFILL NOT NULL,
    address VARCHAR(250) NOT NULL,
    PASSWORD VARCHAR(250) NOT NULL,
    role ENUM('admin','client') NOT NULL,
    UNIQUE(user_name)
); 

CREATE TABLE products(
    product_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_code VARCHAR(250) NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    price DOUBLE NOT NULL,
    UNIQUE(product_code)
); 

CREATE TABLE roles(
    role ENUM('admin','client') NOT NULL,
    resources_id VARCHAR(30) NOT NULL,
    Create_One BOOLEAN NOT NULL,
    Read_One BOOLEAN NOT NULL,
    Write_One BOOLEAN NOT NULL,
    Delete_One BOOLEAN NOT NULL,
    PRIMARY KEY(role, resources_id)
); 


CREATE TABLE orders(
    order_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_status ENUM (
                'nuevo',
                'confirmado',
                'preparando',
                'enviando',
                'entregado',
                'cancelado'
            )
         NOT NULL,
        total FLOAT NOT NULL,
        payment ENUM ('efectivo', 'tarjeta') NOT NULL,
        user_id INT UNSIGNED ZEROFILL NOT NULL,
        -- FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE ordered_products(
    ordered_products_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    quantity INT UNSIGNED ZEROFILL NOT NULL,
    product_id INT UNSIGNED NOT NULL
);

INSERT INTO roles
VALUES('admin', 'orders', 1, 1, 1, 0);
INSERT INTO roles
VALUES('admin', 'products', 1, 1, 1, 1);
INSERT INTO roles
VALUES('admin', 'users', 1, 1, 1, 1);
INSERT INTO roles
VALUES('client', 'orders', 1, 0, 0, 0);
INSERT INTO roles
VALUES('client', 'products', 0, 1, 0, 0);
INSERT INTO roles
VALUES('client', 'users', 0, 0, 0, 0);
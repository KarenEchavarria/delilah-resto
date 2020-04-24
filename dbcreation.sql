-- comands used to create database and tables

CREATE DATABASE IF NOT EXISTS delilah_test1; 

CREATE TABLE delilah_test1.Clients(
    user_name VARCHAR(30) PRIMARY KEY NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    phone INT UNSIGNED NOT NULL,
    address VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    admin BOOLEAN NOT NULL,
); 

CREATE TABLE delilah_test1.Products(
    product_code VARCHAR(250) PRIMARY KEY NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    price DOUBLE NOT NULL
); 

CREATE TABLE delilah_test1.Orders(
    order_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    order_time TIME NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    description INT UNSIGNED NOT NULL,
    total DOUBLE NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    payment VARCHAR(50) NOT NULL,
    user_name VARCHAR(30) NOT NULL
)


-- querys used for testing
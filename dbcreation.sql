-- comands used to create database and tables

CREATE DATABASE IF NOT EXISTS delilah_test1; 

CREATE DATABASE IF NOT EXISTS delilah_test1; CREATE TABLE delilah_test1.roles(
    role TINYINT(1) UNSIGNED ZEROFILL PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    resources_id TINYINT(3) UNSIGNED ZEROFILL NOT NULL,
    Create_One BOOLEAN NOT NULL,
    Read_One BOOLEAN NOT NULL,
    Write_One BOOLEAN NOT NULL,
    Delete_One BOOLEAN NOT NULL,
    Deny BOOLEAN NOT NULL,
); 


CREATE TABLE delilah_test1.resources(
    resources_id TINYINT(3) UNSIGNED ZEROFILL PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE delilah_test1.Users(
    user_name VARCHAR(30) PRIMARY KEY NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    phone INT UNSIGNED ZERO FILLED NOT NULL,
    address VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    role TINYINT(1) NOT NULL
); 

CREATE TABLE delilah_test1.Products(
    product_code VARCHAR(250) PRIMARY KEY NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    price DOUBLE NOT NULL
); 

CREATE TABLE delilah_test1.Orders(
    order_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    order_time TIME NOT NULL,
    order_date DATE NOT NULL,
    quantity INT UNSIGNED ZEROFILL NOT NULL,
    product_code INT UNSIGNED NOT NULL,
    total DOUBLE NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    payment VARCHAR(50) NOT NULL,
    user_name VARCHAR(30) NOT NULL
    -- FOREIGN KEY (user_name) REFERENCES users (user_name),
    -- FOREIGN KEY (name) REFERENCES users (name),
    -- FOREIGN KEY (address) REFERENCES users (address)   
)


INSERT INTO resources VALUES (NULL, 'users');
INSERT INTO resources VALUES (NULL, 'users/user_name');
INSERT INTO resources VALUES (NULL, 'products');
INSERT INTO resources VALUES (NULL, 'products/product_code');
INSERT INTO resources VALUES (NULL, 'orders');
INSERT INTO resources VALUES (NULL, 'orders/order_code');

INSERT INTO roles VALUES (NULL, 'Admin', 1, 0, 0, 1, 1);
INSERT INTO roles VALUES (NULL, 'Admin', 2, 1, 0, 0, 0);
INSERT INTO roles VALUES (NULL, 'Admin', 3, 0, 0, 1, 1);
INSERT INTO roles VALUES (NULL, 'Admin', 4, 1, 0, 0, 0);
INSERT INTO roles VALUES (NULL, 'Admin', 5, 0, 0, 1, 1);
INSERT INTO roles VALUES (NULL, 'Admin', 6, 1, 0, 0, 0);
INSERT INTO roles VALUES (NULL, 'Client', 1, 1, 1, 1, 1);
INSERT INTO roles VALUES (NULL, 'Client', 2, 0, 0, 0, 0);
INSERT INTO roles VALUES (NULL, 'Client', 3, 1, 0, 1, 1);
INSERT INTO roles VALUES (NULL, 'Client', 4, 1, 0, 1, 1);
INSERT INTO roles VALUES (NULL, 'Client', 5, 0, 1, 1, 1);
INSERT INTO roles VALUES (NULL, 'Client', 6, 1, 0, 0, 0);

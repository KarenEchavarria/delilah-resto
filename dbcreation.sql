
CREATE DATABASE IF NOT EXISTS 20NPxAlTA5; 

CREATE TABLE IF NOT EXISTS users(
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

CREATE TABLE IF NOT EXISTS products(
    product_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_code VARCHAR(250) NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    price DOUBLE NOT NULL,
    UNIQUE(product_code)
); 

CREATE TABLE IF NOT EXISTS roles(
    role ENUM('admin','client') NOT NULL,
    resources_id VARCHAR(30) NOT NULL,
    create_one BOOLEAN NOT NULL,
    read_one BOOLEAN NOT NULL,
    write_one BOOLEAN NOT NULL,
    delete_one BOOLEAN NOT NULL,
    PRIMARY KEY(role, resources_id)
); 


CREATE TABLE IF NOT EXISTS orders(
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
        payment ENUM ('efectivo', 'tarjeta') NOT NULL,
        user_id INT UNSIGNED ZEROFILL NOT NULL
);

CREATE TABLE IF NOT EXISTS ordered_products(
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
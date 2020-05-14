require("dotenv").config();
const Sequelize = require("sequelize");

const dbConnection = new Sequelize({
  database: process.env.NAME_DB,
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  dialect: "mysql",
  host: "remotemysql.com",
  port: "3306",
});

async function testingConnection() {
  try {
    await dbConnection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function createTables(req, res, next) {
  try {
    const createUsersTable = await dbConnection.query(
      "CREATE TABLE IF NOT EXISTS users (user_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY, user_name VARCHAR(30) NOT NULL, NAME VARCHAR(250) NOT NULL, email VARCHAR(250) NOT NULL, phone INT UNSIGNED ZEROFILL NOT NULL, address VARCHAR(250) NOT NULL, PASSWORD VARCHAR(250) NOT NULL, role ENUM('admin','client') NOT NULL, UNIQUE(user_name))"
    );
    const createProductsTable = await dbConnection.query(
      "CREATE TABLE IF NOT EXISTS products(product_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,product_code VARCHAR(250) NOT NULL,product_name VARCHAR(250) NOT NULL,price DOUBLE NOT NULL,UNIQUE(product_code))"
    );
    const createRolesTable = await dbConnection.query(
      "CREATE TABLE IF NOT EXISTS roles( role ENUM('admin','client') NOT NULL, resources_id VARCHAR(30) NOT NULL, create_one BOOLEAN NOT NULL, read_one BOOLEAN NOT NULL, write_one BOOLEAN NOT NULL, delete_one BOOLEAN NOT NULL, PRIMARY KEY(role, resources_id))"
    );
    const createOrdersTable = await dbConnection.query(
      "CREATE TABLE IF NOT EXISTS orders( order_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, order_status ENUM ( 'nuevo', 'confirmado', 'preparando', 'enviando', 'entregado', 'cancelado' ) NOT NULL, payment ENUM ('efectivo', 'tarjeta') NOT NULL, user_id INT UNSIGNED ZEROFILL NOT NULL)"
    );
    const createOrderedProductsTable = await dbConnection.query(
      "CREATE TABLE IF NOT EXISTS ordered_products( ordered_products_id INT UNSIGNED ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY, order_id INT NOT NULL, quantity INT UNSIGNED ZEROFILL NOT NULL, product_id INT UNSIGNED NOT NULL )"
    );
    next();
  } catch (err) {
    res.status(500);
  }
}

async function createPermissions(req, res) {
  try {
    await dbConnection.query("INSERT INTO roles VALUES('admin', 'orders', 1, 1, 1, 1)");
    await dbConnection.query("INSERT INTO roles VALUES('admin', 'products', 1, 1, 1, 1)");
    await dbConnection.query("INSERT INTO roles VALUES('admin', 'users', 1, 1, 1, 1)");
    await dbConnection.query("INSERT INTO roles VALUES('client', 'orders', 1, 0, 0, 0)");
    await dbConnection.query("INSERT INTO roles VALUES('client', 'products', 0, 1, 0, 0)");
    await dbConnection.query("INSERT INTO roles VALUES('client', 'users', 0, 0, 0, 0)");
    res.status(200).json("Tables and Permissions created successfully");
  } catch (err) {
    res.status(500);
  }
}

module.exports = { dbConnection, testingConnection, createTables, createPermissions };

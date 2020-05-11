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

module.exports = { dbConnection, testingConnection };

const Sequelize = require("sequelize");

const dbConnection = new Sequelize("20NPxAlTA5", "20NPxAlTA5", "LayNa5PQab", {
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

const express = require("express");
const registerNewUserRouter = express.Router();
const bcrypt = require("bcrypt");
const { dbConnection } = require("./database");

async function registerNewUser(req, res) {
  const { user_name, name, email, phone, address, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 2);
  try {
    await dbConnection.query(
      "INSERT INTO users VALUES(NULL, :user_name, :name, :email, :phone, :address, :password, :role)",
      {
        replacements: {
          user_name: user_name,
          name: name,
          email: email,
          phone: phone,
          address: address,
          password: hashedPassword,
          role: role,
        },
      }
    );
    res.json("The user was created successfully");
  } catch (err) {
    console.log(err);
    res.json("Failure creating the user");
  }
}

registerNewUserRouter.post("/", registerNewUser);

(module.exports = registerNewUserRouter), registerNewUser;

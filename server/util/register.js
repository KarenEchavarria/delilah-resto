const express = require("express");
const registerNewUserRouter = express.Router();
const bcrypt = require("bcrypt");
const { dbConnection } = require("./database");

registerNewUserRouter.post("/", async (req, res) => {
  const { user_name, name, email, phone, address, password, admin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 2);
  try {
    await dbConnection.query(
        "INSERT INTO users VALUES(:user_name, :name, :email, :phone, :address, :password, :admin)",
        {
          replacements: {
            user_name: user_name,
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: hashedPassword,
            admin: admin,
          },
        }
      );
      res.json('The user was created succesfully');
  } catch (err) {
    console.log(err);
    res.json("Failure creating the user");
  }
});

module.exports = registerNewUserRouter;

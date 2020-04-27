const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
const { dbConnection } = require("./database");

loginRouter.post("/", async (req, res, next) => {
  const { user_name, password } = req.body;

  try {
    const [user]
      = await dbConnection.query(
      "SELECT user_name, password FROM users WHERE user_name = :user",
      { replacements: { user: user_name } }
    );
    
    if (!user.length) {
      return res.status(404).json("Cannot find user");
    } 
    else if (await bcrypt.compare(password, user[0].password)) {
      next();
    } else {
      res.json("Not Allowed");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has ocurred");
  }
});

module.exports = loginRouter;

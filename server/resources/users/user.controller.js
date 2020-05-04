const { dbConnection } = require("../../util/database");

async function getAllUsers(req, res) {
  try {
    const [response] = await dbConnection.query("SELECT * FROM users");
    res.json(response);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has ocurred");
  }
}

async function getUser(req, res, err) {
  try {
    const [response] = await dbConnection.query("SELECT * FROM users WHERE user_id = :user", {
      replacements: { user: req.user.user_id },
    });
    const userFound = response.length ? response : "Cannot find the user";
    res.json(userFound);
  } catch (err) {
    console.log(err);
    res.json("An error has ocurred");
  }
}

async function modifyUser(req, res, err) {
  try {
    const fieldsToUpdateArray = Object.entries(req.body);

    for (let [key, value] of fieldsToUpdateArray) {
      await dbConnection.query(
        `UPDATE users SET ${key} = '${value}' WHERE user_id = '${req.user.user_id}'`
      );
    }
    res.status(200).json("User modified!");
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json("An error has ocurred");
  }
}

async function deleteUser(req, res) {
  try {
    await dbConnection.query("DELETE FROM users WHERE user_id = :code", {
      replacements: { code: req.user.user_id },
    });
    res.json("Product deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error has ocurred");
  }
}

module.exports = {
  getAllUsers,
  getUser,
  modifyUser,
  deleteUser,
};

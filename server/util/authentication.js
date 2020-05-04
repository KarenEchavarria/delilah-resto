const sign = "mi_firma_para_delilah_1234567890!";

const jwt = require("jsonwebtoken");
const { dbConnection } = require("./database");

function createToken(req, res) {
  const userCredentials = req.user;

  const token = jwt.sign(JSON.stringify(userCredentials), sign);

  res.send({ accessToken: token });
}

function authenticateToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, sign);
    if (verifyToken) {
      req.user = verifyToken;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Not Allowed. Invalid token");
  }
}

async function checkPermissions(req, res, next) {
  try {
    let isTheirOwnResource;
    let allow = false;
    const path = req.path.split("/")[1];
    const param = req.path.split("/")[2];

    if (path === "orders" && req.method == "POST") return next();

    if (path === "orders" && req.method != "POST") {
      const orderUserId = dbConnection.query(
        "SELECT user_id FROM orders WHERE order_id = :order_id",
        { replacements: { order_id: param } }
      );

      isTheirOwnResource = orderUserId === req.user.user_id;
    }

    isTheirOwnResource = req.user.user_id == param;

    const [permissions] = (
      await dbConnection.query(
        "SELECT * FROM roles WHERE role = :role and resources_id = :resources",
        { replacements: { role: req.user.role, resources: path } }
      )
    ).flat();

    if ((req.method == "POST" && permissions.Create_One) || isTheirOwnResource) allow = true;
    else if ((req.method == "GET" && permissions.Read_One) || isTheirOwnResource) allow = true;
    else if ((req.method == "PUT" && permissions.Write_One) || isTheirOwnResource) allow = true;
    else if ((req.method == "DELETE" && permissions.Delete_one) || isTheirOwnResource) allow = true;

    if (allow) next();
    else res.status(403).send({ error: "access denied" });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}

module.exports = { createToken, authenticateToken, checkPermissions };

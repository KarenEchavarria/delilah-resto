// const { dbConnection } = require("./database");

async function checkAuthorization(req, res, next) {
  if (!req.validation) return res.status(400).json("invalid token");
  try {
    const path = req.path.split("/")[1];

    const [permissions] = (
      await dbConnection.query(
        "SELECT * FROM roles WHERE role = :role and resources_id = :resources",
        { replacements: { role: req.user.role, resources: path } }
      )
    ).flat();
    let allow = false;

    console.log(permissions);

    if (req.method == "POST" && permissions.Create_One === 1) allow = true;
    else if (req.method == "GET" && permissions.Read_One === 1) allow = true;
    else if (req.method == "PUT" && permissions.Write_One === 1) allow = true;
    else if (req.method == "DELETE" && permissions.Delete_one === 1)
      allow = true;

    if (allow) next();
    else res.status(403).send({ error: "access denied" });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}

module.exports = { checkAuthorization };

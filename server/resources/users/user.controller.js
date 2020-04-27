const { dbConnection } = require("../../util/database");

async function getAllUsers(req, res){
    try {
        const [response] = await dbConnection.query("SELECT * FROM users");
        res.json(response);
        res.status(200);
      } catch (err) {
        console.log(err);
        res.status(500).send('An error has ocurred')
      }
}




module.exports = { 
    getAllUsers,
    // getUser,
    // modifyUser,
    // deleteUser 
}
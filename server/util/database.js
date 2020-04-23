const Sequelize = require('sequelize');

const dbConnection = new Sequelize('mysql://root@localhost:3306/delilah_test1');

async function testingConnection(){
    try {
        await dbConnection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {dbConnection, testingConnection}
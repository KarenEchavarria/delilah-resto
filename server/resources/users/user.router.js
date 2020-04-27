const express = require('express');
const userRouter = express.Router();
const { getAllUsers } = require('./user.controller');


userRouter.get('/', getAllUsers);

// userRouter.get('/:user_name', getUser);
// productRouter.put('/:user_name', modifyUser);
// productRouter.delete('/:user_name', deleteUser);

module.exports = userRouter;
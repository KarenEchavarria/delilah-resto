const express = require('express');
const userRouter = express.Router();
const { getAllUsers, getUser, modifyUser, deleteUser } = require('./user.controller');
const registerNewUser = require('../../util/register');


userRouter.get('/', getAllUsers);
userRouter.post('/', registerNewUser);

userRouter.get('/:user_name', getUser);
userRouter.put('/:user_name', modifyUser);
userRouter.delete('/:user_name', deleteUser);

module.exports = userRouter;
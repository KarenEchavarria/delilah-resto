const express = require('express');
const orderRouter = express.Router();
const { getAllOrders, addNewOrder, getOrder, modifyOrder } = require('./order.controller');


orderRouter.get('/', getAllOrders);
orderRouter.post('/', addNewOrder);

orderRouter.get('/:order_id', getOrder);
orderRouter.put('/:order_id', modifyOrder);

module.exports = orderRouter;
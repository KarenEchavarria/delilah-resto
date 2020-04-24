const express = require('express');
const productRouter = express.Router();
const { getAllProducts, addNewProduct, getProduct, modifyProduct, deleteProduct } = require('./product.controller');



productRouter.get('/', getAllProducts);
productRouter.post('/', addNewProduct);


productRouter.get('/:product_code', getProduct);
productRouter.put('/:product_code', modifyProduct);
productRouter.delete('/:product_code', deleteProduct);

module.exports = productRouter;

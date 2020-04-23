const express = require('express');
const productRouter = express.Router();
const { getAllProducts, addNewProduct, getProduct } = require('./product.controller');



productRouter.get('/', getAllProducts);
productRouter.post('/', addNewProduct);


productRouter.get('/:product_code', getProduct);
// productRouter.post('/:product_code', modifyProduct);
// productRouter.delete('/:product_code', deleteProduct);

module.exports = productRouter;
// , modifyProduct, deleteProduct
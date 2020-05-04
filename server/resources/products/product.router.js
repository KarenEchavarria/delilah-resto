const express = require("express");
const productRouter = express.Router();
const {
  getAllProducts,
  addNewProduct,
  getProduct,
  modifyProduct,
  deleteProduct,
} = require("./product.controller");

productRouter.get("/", getAllProducts);
productRouter.post("/", addNewProduct);

productRouter.get("/:product_id", getProduct);
productRouter.put("/:product_id", modifyProduct);
productRouter.delete("/:product_id", deleteProduct);

module.exports = productRouter;

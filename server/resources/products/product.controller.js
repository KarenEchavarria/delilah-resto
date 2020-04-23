const express = require('express');
const app = express();
const { dbConnection } = require("../../util/database");

// app.use(express.json());

async function getAllProducts(req, res, err) {
  const [response] = await dbConnection.query("SELECT * FROM products");
  try {
    res.json(response);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function addNewProduct(req, res, err) {
  
  const { product_code, product_name, price } = req.body;
  
  try {
    const response = await dbConnection.query(
      "INSERT INTO products (product_code, product_name, price) VALUES (:code, :name, :price)",
      { replacements: { code: product_code, name: product_name, price: price } }
    );

    res.json(`product:
             ${product_code},
             ${product_name},
             ${price}
             was added succesfully`);
  } catch (err) {
    console.log(err);
    res.json("Failure creating new product");
  }
}

function getProduct(req, res) {
  const { product_code } = req.params;
  dbConnection.query("SELECT * FROM products WHERE product_code = :code", {
    replacements: { code: product_code },
  });
}
// router.post('/:product_code', modifyProduct);
// router.delete('/:product_code', deleteProduct);

module.exports = {
  getAllProducts,
  addNewProduct,
  getProduct,
};

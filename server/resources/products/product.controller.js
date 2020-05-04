const { dbConnection } = require("../../util/database");

async function getAllProducts(req, res) {
  try {
    const [response] = await dbConnection.query("SELECT * FROM products");
    res.json(response);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has ocurred");
  }
}

async function addNewProduct(req, res, err) {
  const { product_code, product_name, price } = req.body;

  try {
    const response = await dbConnection.query(
      "INSERT INTO products (product_code, product_name, price) VALUES (:code, :name, :price)",
      { replacements: { code: product_code, name: product_name, price: price } }
    );

    res.json(
      `product: code: ${product_code}, name: ${product_name}, price: ${price} was added successfully`
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Failure creating new product");
  }
}

async function getProduct(req, res, err) {
  const { product_id } = req.params;

  try {
    const [response] = await dbConnection.query("SELECT * FROM products WHERE product_id = :code", {
      replacements: { code: product_id },
    });
    const productFound = response.length ? response : "Cannot find the product";
    res.json(productFound);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error has ocurred");
  }
}

async function modifyProduct(req, res, err) {
  try {
    const { product_id } = req.params;
    const fieldsToUpdateArray = Object.entries(req.body);

    for (let [key, value] of fieldsToUpdateArray) {
      await dbConnection.query(
        `UPDATE products SET ${key} = '${value}' WHERE product_id = '${product_id}'`
      );
    }
    res.status(200).json("Product modified!");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error has ocurred");
  }
}

async function deleteProduct(req, res) {
  const { product_id } = req.params;
  try {
    await dbConnection.query("DELETE FROM products WHERE product_id = :id", {
      replacements: { id: product_id },
    });
    res.json("Product deleted");
  } catch (err) {
    console.log(err);
    res.json("Can´t delete product");
  }
}

module.exports = {
  getAllProducts,
  addNewProduct,
  getProduct,
  modifyProduct,
  deleteProduct,
};

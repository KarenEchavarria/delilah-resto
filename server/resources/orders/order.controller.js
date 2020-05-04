const { dbConnection } = require("../../util/database");

async function getAllOrders(req, res) {
  try {
    const [response] = await dbConnection.query("SELECT * FROM orders");
    res.json(response);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has ocurred");
  }
}

async function addNewOrder(req, res) {
  try {
    await dbConnection.query("INSERT INTO orders (payment, user_id) VALUES (:payment, :user_id)", {
      replacements: { payment: req.body.payment, user_id: req.user.user_id },
    });

    const [orderId] = (await dbConnection.query("SELECT MAX(order_id) FROM orders")).flat();

    for (const { quantity, product_id } of req.body.products_ordered) {
      await dbConnection.query(
        `INSERT INTO ordered_products(order_id, quantity, product_id) VALUES (${orderId["MAX(order_id)"]}, ${quantity}, ${product_id})`
      );
    }

    res.json(`The order was added successfully`);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failure creating order");
  }
}

async function getOrder(req, res, err) {
  const { order_id } = req.params;

  try {
    const [response] = await dbConnection.query("SELECT * FROM orders WHERE order_id = :id", {
      replacements: { id: order_id },
    });
    const orderFound = response.length ? response : "Cannot find the product";
    res.json(orderFound);
  } catch (err) {
    console.log(err);
    res.json("An error has ocurred");
  }
}

async function modifyOrder(req, res, err) {
  console.log(req.params);
  try {
    const { order_id } = req.params;
    const fieldsToUpdateArray = Object.entries(req.body);

    for (let [key, value] of fieldsToUpdateArray) {
      await dbConnection.query(
        `UPDATE orders SET ${key} = '${value}' WHERE order_id = '${order_id}'`
      );
    }
    res.status(200).json("Order modified!");
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json("An error has ocurred");
  }
}

module.exports = { getAllOrders, addNewOrder, getOrder, modifyOrder };

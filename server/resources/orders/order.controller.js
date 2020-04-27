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

async function addNewOrder(req, res, err) {
  const { order_time, order_date, total, payment, user_name } = req.body;

  try {
    const response = await dbConnection.query(
      "INSERT INTO orders (order_id, order_time, order_date, total, payment, user_name) VALUES (Null, :order_time, :order_date, :total, :payment, :user_name)",
      {
        replacements: {
          order_time: order_time,
          order_date: order_date,
          // product_code: product_code,
          total: total,
          payment: payment,
          user_name: user_name,
        },
      }
    );

    res.json(`The order was added successfully`);
  } catch (err) {
    console.log(err);
    res.json("Failure creating new product");
  }
}

async function getOrder(req, res, err) {
  const { order_id } = req.params;

  try {
    const [response] = await dbConnection.query(
      "SELECT * FROM orders WHERE order_id = :id",
      {
        replacements: { id: order_id },
      }
    );
    const orderFound = response.length
        ? response
        : "Cannot find the product";
    res.json(orderFound);
  } catch (err) {
    console.log(err);
    res.json("An error has ocurred");
  }
}

async function modifyOrder(req, res, err) {
  console.log(req.params)
  try {
    const { order_id } = req.params;
    const fieldsToUpdateArray = Object.entries(req.body);

    for (let [key, value] of fieldsToUpdateArray) {
      await dbConnection.query(
      `UPDATE orders SET ${key} = '${value}' WHERE order_id = '${order_id}'`
      );
    }
    res.status(200).json('Order modified!');
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json("An error has ocurred");
  }
}






module.exports = { getAllOrders, addNewOrder, getOrder, modifyOrder };

const { dbConnection } = require("../../util/database");

async function getAllOrders(req, res) {
  try {
    const [orders] = await dbConnection.query(
      "SELECT orders.*, GROUP_CONCAT(ordered_products.quantity, 'x', (SELECT products.product_code FROM products WHERE products.product_id = ordered_products.product_id GROUP BY ordered_products.order_id) SEPARATOR ', ') AS ordered_products FROM ordered_products JOIN orders WHERE ordered_products.order_id = orders.order_id GROUP BY ordered_products.order_id"
    );

    const [total] = await dbConnection.query(
      "SELECT SUM(quantity * (SELECT price FROM products WHERE products.product_id = ordered_products.product_id)) AS total FROM ordered_products GROUP BY order_id"
    );
    const response = orders.map((order, index) => ({ ...order, ...total[index] }));

    res.json(response);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has ocurred");
  }
}

async function addNewOrder(req, res) {
  try {
    const [order] = await dbConnection.query(
      "INSERT INTO orders (payment, user_id) VALUES (:payment, :user_id)",
      {
        replacements: { payment: req.body.payment, user_id: req.user.user_id },
      }
    );

    for (const { quantity, product_id } of req.body.products_ordered) {
      await dbConnection.query(
        `INSERT INTO ordered_products(order_id, quantity, product_id) VALUES (:order_id, :quantity, :product)`,
        {
          replacements: { order_id: order, quantity: quantity, product: product_id },
        }
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
    const [orders] = await dbConnection.query(
      "SELECT orders.*, GROUP_CONCAT(ordered_products.quantity, 'x', (SELECT products.product_code FROM products WHERE products.product_id = ordered_products.product_id GROUP BY ordered_products.order_id) SEPARATOR ', ') AS ordered_products FROM ordered_products JOIN orders WHERE ordered_products.order_id = orders.order_id AND ordered_products.order_id = :id GROUP BY ordered_products.order_id",
      {
        replacements: { id: order_id },
      }
    );

    if (orders.length === 0) {
      res.status(404).json("Cannot find the order");
    }

    const [total] = await dbConnection.query(
      "SELECT SUM(quantity * (SELECT price FROM products WHERE products.product_id = ordered_products.product_id AND ordered_products.order_id = :id)) AS total FROM ordered_products GROUP BY order_id",
      {
        replacements: { id: order_id },
      }
    );

    const response = orders.map((order, index) => ({ ...order, ...total[index] }));

    res.json(response);
  } catch (err) {
    console.log(err);
    res.json("An error has ocurred");
  }
}

async function modifyOrder(req, res, err) {
  try {
    const { order_id } = req.params;
    const { order_status } = req.body;
    await dbConnection.query("UPDATE orders SET order_status = :status WHERE order_id = :id", {
      replacements: { status: order_status, id: order_id },
    });
    res.status(200).json("Order modified!");
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json("An error has ocurred");
  }
}

module.exports = { getAllOrders, addNewOrder, getOrder, modifyOrder };

const app = require("express")();
const bodyParser = require("body-parser");
const productRouter = require("./resources/products/product.router");
const userRouter = require("./resources/users/user.router");
const registerNewUserRouter = require("./util/register");
const loginRouter = require("./util/login");
const orderRouter = require("./resources/orders/order.router");
const { createDB, createTables, createPermissions } = require("./util/database");
const { createToken, authenticateToken, checkPermissions } = require("./util/authentication");

app.use(bodyParser.json());

app.post("/createdb", createTables, createPermissions);

app.use("/register", registerNewUserRouter);
app.use("/login", loginRouter, createToken);

app.use(authenticateToken);
app.use(checkPermissions);

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

const startServer = () => {
  try {
    app.listen(3005, () => {
      console.log("Server online in port 3005");
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = startServer;

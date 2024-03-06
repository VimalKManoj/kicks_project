const express = require("express");
const productRouter = require("./Routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRouter);

app.use("*", (req, res) => {
  res.json({
    message: "can't find this link on this server",
  });
});

module.exports = app;

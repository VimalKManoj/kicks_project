const express = require("express");
const productRouter = require("./Routes/productRoutes");
const userRouter = require("./Routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.use("*", (req, res) => {
  res.json({
    message: "can't find this link on this server",
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(500).json({
    statusCode , 
    error :message , 
    status : 'fail'
  })
});

module.exports = app;

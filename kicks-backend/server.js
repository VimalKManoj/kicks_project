const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((error) => console.log(error));

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`listening to ${port}`);
});

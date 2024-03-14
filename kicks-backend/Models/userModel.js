const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not same!",
      },
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", userSchema);

module.exports = Users;

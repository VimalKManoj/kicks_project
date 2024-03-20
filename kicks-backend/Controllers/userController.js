const { errorHandler } = require("../utils/errorHandler");
const User = require("./../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    res.status(201).json({ data: newUser, status: "success" });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));
    console.log(user)

    const correctPass = await bcrypt.compare(password, user.password);

    if (!correctPass) return next(errorHandler(401, "Wrong Password"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("jwt", token, cookieOptions)
      .status(200)
      .json({ status: "success", user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("jwt", token, cookieOptions)
      .status(201)
      .json({ data: newUser, status: "success" });
  } catch (error) {
    let err;
    console.log(error);
    if (error.code === 11000) {
      err = "User with this email already exists!";
    } else if (error.name === "ValidationError") {
      err = "Password should be 8 characters minimum";
    
    }
    next(errorHandler(400, err));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));
    console.log(user);

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

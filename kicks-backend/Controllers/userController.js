const { errorHandler } = require("../utils/errorHandler");
const User = require("./../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer')
const sharp = require('sharp')

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

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
    if (!user) return next(errorHandler(404, "User not found. Signup Please!"));
    console.log(user);

    const correctPass = await bcrypt.compare(password, user.password);

    if (!correctPass)
      return next(errorHandler(401, "Invalid Email / Password"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("jwt", token, cookieOptions)
      .status(200)
      .json({ status: "success", isLoggedIn: true, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user);
    req.id = user.id;
  });
  next();
};

exports.protect =async (req , res , next) =>{
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    // IF NO TOKEN IS PRESENT
    return next(errorHandler(401,'You are not logged in , Please log in to get access'),
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    next(error);
  }
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('User belonging to the token no longer exist', 401),
    );
  }

  req.user = freshUser;
  next();
}

exports.logout = (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  // WHEN LOGGING OUT SEND A NEW COOKIE WITH NO JWT TOKEN SO THAT IT FAILS THE VERIFY
  res
    .cookie("jwt", "logged out", cookieOptions)
    .status(200)
    .json({ status: "success" });
};


// -----------------------------------------------------------------------------------------

const multerStorage = multer.memoryStorage()



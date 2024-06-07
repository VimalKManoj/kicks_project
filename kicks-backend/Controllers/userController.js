const { errorHandler } = require("../utils/errorHandler");
const User = require("./../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const Product = require("../Models/productModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    // console.log(error);
    next(error);
  }
};

exports.verifyToken = (req, res, next) => {
  // Extracting the token from cookies
  const cookies = req.headers.cookie;
  const token = cookies
    ? cookies.split(";").find((cookie) => cookie.trim().startsWith("jwt="))
    : null;
  // console.log(token);

  // If token is not present, return an error
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }

  const jwtToken = token.split("=")[1];
  // Verify the token
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If the token is invalid, return an error
      return res.status(400).json({ message: "Invalid Token" });
    }
    // If the token is valid, store the user's id in the request object
    req.id = user.id;

    // Call the next middleware
  });

  next();
};

exports.getUserId = (req, res, next) => {
  req.params.id = req.id;
  next();
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(`document with ID not found`, 404));
    }

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

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

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(errorHandler("Upload an image ", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.file.filename = `user-${req.id}-${Date.now()}.jpeg`;
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "kicks-frontend",
      "public",
      "users",
      req.file.filename
    );

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(filePath);

    next();
  } catch (error) {
    next(error);
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMyData = async (req, res, next) => {
  try {
    // const { name, address, city, country, mobile } = req.body;
    const filterBody = filterObj(
      req.body,
      "name",
      "address",
      "city",
      "country",
      "mobile"
    );

    if (req.file) filterBody.photo = req.file.filename;
    const updateUser = await User.findByIdAndUpdate(req.id, filterBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: "success", user: updateUser });
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const userId = req.id;
    const productId = req.body.product._id;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $addToSet: { wishlist: productId },
    });

    res.status(200).json({
      message: "Success",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.removefromWishlist = async (req, res, next) => {
  try {
    const userId = req.id;
    const productId = req.body.products._id;

    const removedList = await User.findByIdAndUpdate(userId, {
      $pull: { wishlist: productId },
    });

    res.status(200).json({ status: "success", removedList });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const wishlist = await Product.find({ _id: { $in: user.wishlist } });

    res.status(200).json({ status: "success", wishlist });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

exports.toCart = async (req, res, next) => {
  try {
    const userId = req.id;
    const productId = req.body.products._id;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $addToSet: { cart: productId },
    });

    res.status(200).json({
      message: "Success",
      data: updatedUser,
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

exports.removefromCart = async (req, res, next) => {
  try {
    const userId = req.id;
    const productId = req.body.products._id;

    const removedList = await User.findByIdAndUpdate(userId, {
      $pull: { cart: productId },
    });

    res.status(200).json({ status: "success", removedList });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Product.find({ _id: { $in: user.cart } });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const products = req.body.products;
    console.log(products)

    
    const user = await User.findById(req.id);

    const currentTime = Math.floor(Date.now() / 1000);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.images[0]],
          metadata: {
            productId: product.id,
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      customer_email:user.email,
      invoice_creation: {
        enabled: true,
        invoice_data: {
          custom_fields: null,
          description: null,
          metadata: {
            createdAt: currentTime, // Add the current time here
          },
        },
      },
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:5173/payment_success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/payment_failure",
    });

    res.status(200).json({ status: "success", session });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const sessionID = req.body.sessionID;
    

    const session = await stripe.checkout.sessions.retrieve(sessionID);

    console.log(session.invoice_creation.invoice_data.metadata);

    const expirationTime = new Date(1717753327 * 1000);
    console.log(expirationTime)
    
  } catch (error) {}
};

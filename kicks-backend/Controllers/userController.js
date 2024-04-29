const { errorHandler } = require("../utils/errorHandler");
const User = require("./../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");


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
    console.log(error);
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
  console.log(req)
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
    console.log(req.body)
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
    console.log(updateUser , req.file)
    res.status(200).json({ status: "success", user: updateUser });
  } catch (error) {
    console.log(error)
  }
};

// exports.protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }
//   if (!token) {
//     // IF NO TOKEN IS PRESENT
//     return next(
//       errorHandler(401, "You are not logged in , Please log in to get access")
//     );
//   }

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     next(error);
//   }
//   const freshUser = await User.findById(decoded.id);
//   if (!freshUser) {
//     return next(
//       new AppError("User belonging to the token no longer exist", 401)
//     );
//   }

//   req.user = freshUser;
//   next();
// };

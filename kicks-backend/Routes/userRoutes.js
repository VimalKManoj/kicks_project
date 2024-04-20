const express = require("express");
const {
  signUp,
  signIn,
  verifyToken,
  logout,
} = require("../Controllers/userController");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/profile").get(verifyToken);
router.route("/logout").get(logout);

module.exports = router;

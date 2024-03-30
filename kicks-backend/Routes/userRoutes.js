const express = require("express");
const {
  signUp,
  signIn,
  verifyToken,
} = require("../Controllers/userController");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/profile").get(verifyToken);

module.exports = router;

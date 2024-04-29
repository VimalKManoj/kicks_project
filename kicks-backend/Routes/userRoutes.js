const express = require("express");
const {
  signUp,
  signIn,
  verifyToken,
  logout,
  uploadUserPhoto,
  resizeUserPhoto,
  updateMyData,
  getUserId,
  getUser,
} = require("../Controllers/userController");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/profile").get(verifyToken, getUserId, getUser);
router.route("/logout").get(logout);


router
  .route("/updateUserData")
  .post(verifyToken ,uploadUserPhoto, resizeUserPhoto ,updateMyData);
//,
module.exports = router;

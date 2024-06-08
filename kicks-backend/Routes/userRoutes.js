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
  addToWishlist,
  removefromWishlist,
  getWishlist,
  getCart,
  removefromCart,
  toCart,
  checkout,
  createBooking,
  getOrders,
  getOrderedProducts,
} = require("../Controllers/userController");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/profile").get(verifyToken, getUserId, getUser);
router.route("/logout").get(logout);

router
  .route("/updateUserData")
  .post(verifyToken, uploadUserPhoto, resizeUserPhoto, updateMyData);
//,
router.route("/addToWish").post(verifyToken, addToWishlist);
router.route("/removefromWish").post(verifyToken, removefromWishlist);

router.use(verifyToken)
router.route('/getuserwishlist').get(getWishlist)

router.route('/addtocart').post(toCart)
router.route('/removefromcart').post(removefromCart)
router.route('/getcart').get(getCart)
router.route('/checkout').post(checkout)
router.route('/createbooking').post(createBooking)
router.route('/getorders').get(getOrders).get(getOrderedProducts)
module.exports = router;

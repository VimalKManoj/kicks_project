const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Booking must have product"],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must have a user"],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, "Booking must have price"],
  },
  createdAt: {
    type: Number,
    unique:true,
    required: true,
  },
});

const Booking = mongoose.model("bookings",bookingSchema);

module.exports = Booking;

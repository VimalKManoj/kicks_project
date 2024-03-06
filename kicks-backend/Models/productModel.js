const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "A shoe must have a brand"],
  },
  name: {
    type: String,
    required: [true, "A must have a name"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Shoe must belong to a category"],
    enum: {
      values: ["training", "running", "lifestyle"],
      message: "Category should be training ,running or lifestyle",
    },
  },
  slug: String,
  price: {
    type: Number,
    required: [true, "Shoe must have a price"],
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 20,
  },
  size: {
    type: Number,
  },
});

const Product = mongoose.model("products", productSchema);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = Product;

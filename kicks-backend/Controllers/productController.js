const Product = require("../Models/productModel");
const APIfeatures = require("../utils/APIfeatures");

exports.getAllProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Product.find(), req.query)
      .filter()
      .sort()
      .fieldLimit()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "Success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed",
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(201).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed",
      error,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(201).json({
      message: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).send({
      data: null,
      message: "deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed",
      error,
    });
  }
};

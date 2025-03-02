const { getIo } = require("../../socket");
const Product = require("../models/product");
const { SOMETHING_WENT_WRONG } = require("../lang/en/common");
const { successResponse, errorResponse } = require("../helpers/apiResponse");

exports.productList = async (req, res) => {
  try {
    const products = await Product.find({});

    return successResponse({
      res,
      data: products,
      msg: "Products fetched successfully",
    });
  } catch (error) {
    return errorResponse({
      res,
      error,
      status: 500,
      msg: SOMETHING_WENT_WRONG,
    });
  }
};

exports.updateStock = async (req, res) => {
  try {
    let { stock = 0 } = req.body;

    if (stock < 0) stock = 0;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse({
        res,
        status: 404,
        msg: "Product not found",
      });
    }

    product.stock = stock;
    await product.save();

    const io = getIo();
    io.emit("updateStock", product);

    return successResponse({
      res,
      data: product,
      msg: "Products fetched successfully",
    });
  } catch (error) {
    return errorResponse({
      res,
      error,
      status: 500,
      msg: SOMETHING_WENT_WRONG,
    });
  }
};

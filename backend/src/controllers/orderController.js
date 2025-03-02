const Order = require("../models/order");
const { getIo } = require("../../socket");
const Product = require("../models/product");
const { SOMETHING_WENT_WRONG } = require("../lang/en/common");
const { successResponse, errorResponse } = require("../helpers/apiResponse");

exports.orderList = async (req, res) => {
  try {
    const orders = await Order.find(null, null, {
      sort: { createdAt: -1 },
    }).populate([
      {
        path: "userId",
        model: "users",
        select: ["fullName", "email"],
        options: { strictPopulate: false },
      },
    ]);

    return successResponse({
      res,
      data: orders,
      msg: "Orders fetched successfully",
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

exports.orderPlace = async (req, res) => {
  try {
    const order = await new Order({ ...req.body, userId: req.user.id }).save();

    if (order) {
      const cartItems = req.body.cartItems;
      const productIds = [];

      const bulkOps = cartItems.map((item) => {
        productIds.push(item.id);

        return {
          updateOne: {
            filter: { _id: item.id, stock: { $gte: item.count } },
            update: { $inc: { stock: -item.count } },
          },
        };
      });

      await Product.bulkWrite(bulkOps);

      const updatedProducts = await Product.find({
        _id: { $in: productIds },
      });

      const io = getIo();
      io.emit("updateMultiStock", updatedProducts);

      return successResponse({
        res,
        data: order,
        msg: "Order placed successfully",
      });
    } else {
      return errorResponse({
        res,
        status: 400,
        msg: "Order not placed",
      });
    }
  } catch (error) {
    return errorResponse({
      res,
      error,
      status: 500,
      msg: SOMETHING_WENT_WRONG,
    });
  }
};

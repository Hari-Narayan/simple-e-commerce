const mongoose = require("mongoose");
const moment = require("moment");

const cartItemSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    image: { type: String, required: true },
    count: { type: Number, required: true },
    itemTotal: { type: Number, required: true },
    description: { type: String, required: true },
    name: {
      trim: true,
      index: true,
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, res) => {
        delete res._id;
      },
      getters: true,
    },
  }
);

const schema = new mongoose.Schema(
  {
    userId: {
      ref: "user",
      alias: "user",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    address: { type: String, required: true },
    cartCount: { type: Number, required: true },
    cartTotal: { type: Number, required: true },
    cartItems: { type: [cartItemSchema], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, res) => {
        delete res._id;
        delete res.userId;
        res.createdAt = moment(doc.createdAt).format("DD MMM, YYYY");
        res.updatedAt = moment(doc.updatedAt).format("DD MMM, YYYY");
      },
      getters: true,
    },
  }
);
// .plugin(mongoosePaginate);

const Order = mongoose.model("orders", schema);

module.exports = Order;

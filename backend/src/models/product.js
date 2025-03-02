const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema(
  {
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    name: {
      trim: true,
      index: true,
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, res) => {
        delete res._id;
        // delete res.user;
      },
      getters: true,
    },
  }
).plugin(mongoosePaginate);

const Product = mongoose.model("products", schema);

module.exports = Product;

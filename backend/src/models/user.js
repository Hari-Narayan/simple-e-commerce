const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { userSetJson, encryptPassword } = require("../helpers/modelHelper");

const schema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    status: { type: Boolean, required: true, default: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: false,
      set: encryptPassword,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    virtuals: {
      token: { type: String },
    },
    toJSON: userSetJson,
  }
).plugin(mongoosePaginate);

const User = mongoose.model("users", schema);

module.exports = User;

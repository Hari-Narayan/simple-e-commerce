const User = require("../models/user");
const { verifyToken } = require("../helpers/commonHelper");
const { errorResponse } = require("../helpers/apiResponse");

const auth = async (req, res, next) => {
  let token = req.headers.authorization || "";
  token = token ? token.replace("Bearer ", "") : "";

  try {
    const data = verifyToken(token);
    const user = await User.findOne({ email: data.email });
    req.user = user;

    return next();
  } catch (error) {
    return errorResponse({
      res,
      status: 401,
      message: "You are unauthorized!",
    });
  }
};

module.exports = auth;

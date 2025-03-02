const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { createToken } = require("../helpers/commonHelper");
const { successResponse, errorResponse } = require("../helpers/apiResponse");
const { SOMETHING_WENT_WRONG, LOGIN_SUCCESS } = require("../lang/en/common");
const { USER_NOT_FOUND, INCORRECT_PASSWORD_ERR } = require("../lang/en/user");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user)
      return errorResponse({
        res,
        status: 404,
        msg: USER_NOT_FOUND,
        error: USER_NOT_FOUND,
      });

    const isPassMatched = bcrypt.compareSync(password, user.password);

    if (!isPassMatched)
      return errorResponse({
        res,
        status: 400,
        msg: INCORRECT_PASSWORD_ERR,
        error: INCORRECT_PASSWORD_ERR,
      });

    const token = createToken({ email: user.email });

    return successResponse({
      res,
      data: { data: user, token },
      msg: LOGIN_SUCCESS,
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

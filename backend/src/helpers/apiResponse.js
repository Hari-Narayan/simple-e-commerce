const { SOMETHING_WENT_WRONG } = require("../lang/en/common");

/**
 * ### SuccessResponse
 * @param {*} param0 - { res, msg, status, data }
 * @returns response
 */
exports.successResponse = ({ res, msg, status = 200, data = {} }) => {
  return res.status(status).json({
    data,
    status,
    message: msg,
    success: true,
  });
};

exports.errorResponse = ({
  res,
  status = 500,
  error = null,
  msg = SOMETHING_WENT_WRONG,
}) => {
  return res.status(status).json({
    status,
    message: msg,
    success: false,
    data: error?.message || msg,
  });
};

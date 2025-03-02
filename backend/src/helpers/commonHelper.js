const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

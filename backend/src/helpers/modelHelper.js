const bcrypt = require("bcryptjs");

exports.createFileURL = (image, folder) => {
  return image ? `${process.env.HOST}/${folder}/${image}` : null;
};

exports.userSetJson = {
  transform: (doc, res) => {
    delete res._id;
    delete res.password;
    delete res.createdAt;
    delete res.updatedAt;
  },
  getters: true,
};

exports.encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

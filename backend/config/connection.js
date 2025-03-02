const mongoose = require("mongoose");

(() => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.info("Database connected.");
    })
    .catch((err) => {
      console.error("Database connection error: ", err);
    });
})();

exports.disconnectDB = async (req, res) => {
  try {
    await mongoose.disconnect();
    console.info("Database connection disconnected manually.");
  } catch (error) {
    console.error("Error disconnecting database:", error);
  }
};

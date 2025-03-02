const User = require("../models/user");

module.exports = async () => {
  try {
    const dbData = await User.find();

    if (dbData.length) return;

    const data = [
      { fullName: "Alice", email: "alice@example.com", password: "123456" },
      { fullName: "Bob", email: "bob@example.com", password: "123456" },
      { fullName: "Charlie", email: "charlie@example.com", password: "123456" },
    ];

    const insertedData = await User.insertMany(data);
    console.info(`${insertedData.length} users inserted`);
  } catch (error) {
    console.error(error);
  }
};

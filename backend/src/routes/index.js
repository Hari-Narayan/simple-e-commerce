const rootRrouter = require("express")();

const authRouter = require("./authRoute");
const orderRouter = require("./orderRoute");
const productRouter = require("./productRoute");

rootRrouter.use("/auth", authRouter);
rootRrouter.use("/order", orderRouter);
rootRrouter.use("/product", productRouter);

module.exports = rootRrouter;

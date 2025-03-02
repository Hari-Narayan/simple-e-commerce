const orderRouter = require("express").Router();

const auth = require("../middlewares/auth");
const { orderList, orderPlace } = require("../controllers/orderController");

orderRouter.get("/list", auth, orderList);
orderRouter.post("/place", auth, orderPlace);

module.exports = orderRouter;

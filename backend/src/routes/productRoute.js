const productRouter = require("express").Router();

const {
  productList,
  updateStock,
} = require("../controllers/productController");

productRouter.get("/list", productList);
productRouter.put("/updateStock/:id", updateStock);

module.exports = productRouter;

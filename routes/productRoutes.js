const express = require("express");
const productController = require("../controllers/productController");
const mongoUpload = require("../middlewares/mongoUpload");

const router = express.Router();

router.post(
  "/add",
  mongoUpload.single("product"),
  productController.createProduct
);
router.get("/", productController.getAllProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

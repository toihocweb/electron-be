const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.post("/add", categoryController.createCategory);
router.get("/", categoryController.getAllCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;

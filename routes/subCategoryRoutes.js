const express = require("express");
const subCategoryController = require("../controllers/subCategoryController");

const router = express.Router();

router.post("/add", subCategoryController.createSubCategory);
router.get("/:id", subCategoryController.getAllSubByCategory);

module.exports = router;

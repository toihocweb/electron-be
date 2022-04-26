const SubCategory = require("../models/SubCategory");

module.exports.createSubCategory = async (req, res) => {
  const { sub_name, category } = req.body;

  const saveSubCategory = await SubCategory.create({
    sub_name,
    category,
  });
  if (!saveSubCategory) {
    res.status(400).json({
      success: false,
      message: "can not save",
    });
  }
  res.status(201).json({
    success: true,
    data: saveSubCategory,
  });
};

module.exports.getAllSubByCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const subCategories = await SubCategory.find({ category: categoryId });
  if (!subCategories) {
    res.status(400).json({
      success: false,
      message: "get can not category",
    });
  }
  res.json({
    success: true,
    data: subCategories,
  });
};

// module.exports.deleteCategory = async (req, res) => {
//   const { id } = req.params;
//   await Category.findByIdAndDelete(id).catch((err) => {
//     return res.status(400).json({
//       success: false,
//       message: "can not delete",
//     });
//   });
//   res.json({
//     success: true,
//   });
// };

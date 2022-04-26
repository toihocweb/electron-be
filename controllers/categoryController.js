const Category = require("../models/Category");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");

module.exports.createCategory = async (req, res) => {
  const { name } = req.body;

  const saveCategory = await Category.create({
    name,
  });
  if (!saveCategory) {
    res.status(400).json({
      success: false,
      message: "can not save",
    });
  }
  res.status(201).json({
    success: true,
    data: saveCategory,
  });
};

module.exports.getAllCategory = async (req, res) => {
  const categories = await Category.find().lean();
  const subCategories = await SubCategory.find().lean();
  const products = await Product.find().lean();

  if (!categories) {
    res.status(400).json({
      success: false,
      message: "get can not category",
    });
  }

  // add sub category to categories array
  const categoryWithSub = categories.map((cat) => {
    return {
      ...cat,
      total: products.filter((prod) => {
        const idx = (prod.parent_category || []).findIndex((val) => {
          return val.toString() === cat._id.toString();
        });
        return idx !== -1;
      }).length,
      sub_categories: subCategories
        .filter((sub) => {
          return sub.category.toString() === cat._id.toString();
        })
        .map((sub) => {
          return {
            ...sub,
            total: products.filter((prod) => {
              const idx = prod.category.findIndex((val) => {
                return val.toString() === sub._id.toString();
              });
              return idx !== -1;
            }).length,
          };
        }),
    };
  });

  res.json({
    success: true,
    data: categoryWithSub,
  });
};

module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id).catch((err) => {
    return res.status(400).json({
      success: false,
      message: "can not delete",
    });
  });
  res.json({
    success: true,
  });
};

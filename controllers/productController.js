const Product = require("../models/Product");

module.exports.createProduct = async (req, res) => {
  const { name, category, origin_price, promotion_price, isSub } = req.body;

  // hinh
  const productImage = req?.file?.filename || null;

  const dataPost = {
    name,
    origin_price,
    promotion_price,
    image: productImage,
  };

  if (isSub === "true") {
    dataPost.category = JSON.parse(category);
  } else {
    dataPost.parent_category = JSON.parse(category);
  }

  const saveProduct = await Product.create(dataPost);

  if (!saveProduct) {
    res.status(400).json({
      success: false,
      message: "can not save",
    });
  }
  res.status(201).json({
    success: true,
    data: saveProduct,
  });
};

module.exports.getAllProduct = async (req, res) => {
  const products = await Product.find()
    .populate("category", "sub_name")
    .populate("parent_category", "name");
  if (!products) {
    res.status(400).json({
      success: false,
      message: "get can not product",
    });
  }
  res.json({
    success: true,
    data: products,
  });
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id).catch((err) => {
    return res.status(400).json({
      success: false,
      message: "can not delete",
    });
  });
  res.json({
    success: true,
  });
};

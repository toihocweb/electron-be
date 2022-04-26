const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    sub_name: {
      type: String,
      required: [true, "category name is required!"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);

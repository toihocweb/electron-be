const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// ['6235d3e562be2e9242c46584']
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required!"],
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    parent_category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    origin_price: {
      type: Number,
      required: [true, "price is required!"],
    },
    promotion_price: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Product", productSchema);

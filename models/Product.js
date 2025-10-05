const mongoose = require("mongoose");

//Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default:""},
  stock_quantity: { type: Number, required: true, min: 0 },
  low_stock_threshold: { type: Number, required: true, min: 0, default: 0 },
});

module.exports = mongoose.model("Product", ProductSchema);

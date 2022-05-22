const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  rate: Number,
});

module.exports = mongoose.model("Product", ProductSchema);

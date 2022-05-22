const Product = require("../model/product.model");

module.exports = {  getAllProducts };
 

async function getAllProducts(req, res) {
  return await Product.find();
}

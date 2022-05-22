const express = require("express");
const productCtrl = require("../ctrl/product.ctrl");

const router = express.Router();
module.exports = router;
 
router.route("/getall").get(getAllProducts);

async function getAllProducts(req, res) {
  let data = await productCtrl.getAllProducts(req, res);
  res.json(data);
}



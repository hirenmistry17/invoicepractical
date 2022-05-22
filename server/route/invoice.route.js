const express = require("express");
const invoiceCtrl = require("../ctrl/invoice.ctrl");
const stripe = require("../stripe");
const router = express.Router();
module.exports = router;

router.route("/insert").post(insert);
router.route("/getById/:Id").get(getbyId);
router.route("/getall").get(getAll);
router.route("/payment").post(makePayment);
router.route("/updatestatus").post(updatestatus);

async function makePayment(req, res) {
  let data = await stripe.makePayment(req, res);
  console.log("makePayment res",data);
  res.json(data);
}

async function insert(req, res) {
  let data = await invoiceCtrl.insert(req, res);
  res.json(data);
}

async function getbyId(req, res) {
  let data = await invoiceCtrl.getById(req, res);
  res.json(data);
}

async function getAll(req, res) {
  let data = await invoiceCtrl.getAll(req, res);
  res.json(data);
}


async function updatestatus(req, res) {
  let data = await invoiceCtrl.updatestatus(req, res);
  res.json(data);
}



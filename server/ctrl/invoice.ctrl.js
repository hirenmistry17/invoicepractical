const Invoice = require("../model/invoice.model");

module.exports = { insert, getAll ,updatestatus ,getById };

async function insert(req, res) {
  var invoice = new Invoice(req.body);
  await invoice.save(function (res) {
    console.log("res",res);
  });
}

async function getById(req, res) {
  return await Invoice.findById(req.params.Id);
}

async function getAll(req, res) {
  return await Invoice.find();
}

async function updatestatus(req, res) {
  return await Invoice.findByIdAndUpdate({_id : req.body._id }, { "$set": { "status": req.body.status }});
}


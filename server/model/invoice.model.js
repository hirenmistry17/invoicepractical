const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  invnumber: { type: Number, required: true },
  billaddress: { type: Object, required: true },
  shippingaddress: { type: Object, required: true },
  status: { type: String, default: "Unpaid" },
  date: { type: Date, default: new Date() },
  products: [{
      productid : { type: mongoose.Schema.Types.ObjectId ,ref: 'Product' },
      productname : String,
      qty : Number,
      amount : Number,
      totalamount : Number,
  }],
  totalamount: { type: Number, required: true },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);

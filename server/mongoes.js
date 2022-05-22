const mongoose = require('mongoose');

// const url = "mongodb://localhost:27017/project12";
const url = "mongodb+srv://dbadmin:Pass1234@cluster.l7dsh.mongodb.net/invoiceDB?retryWrites=true&w=majority";

const mongooses =  mongoose.connect(url);
mongooses.then((res)=>{
  console.log("connection success !");
},(e)=>{
  console.log("Something went wrong !");
}) 
const express = require("express");
const app = express();

const public_key =
  "pk_test_51L28M8SEw89ek4mXxnZsX0PBZbkFTZWSSDc3zpGrFfb783MDvojJg1kodeRBHhvEglhdsMrVzY0eARlmEYnh4L5200OcZY1voz";
const secret_key =
  "sk_test_51L28M8SEw89ek4mXpy1mPTmJ7NUCZbIEJA00hbYfpF04IJ4JPL5QZXuprALK63LDQxHZQmIapCuGJc50M8YKRdzq009NSheOMM";

const stripe = require("stripe")(secret_key);

  async function makePayment(req, res) {
   return await stripe.paymentIntents.create({ amount: req.body.totalamount * 100 , currency: "inr", payment_method_types: ['card'], description:  `Payment done by ${req.body.holdername}` });
  }
   // stripe.customers
    // .create({
    //   name: "Hiren M",
    //   email: "test1@gmail.com",
    //   source: token.id,
    // })
    //     card: {
    //       "number": '4242424242424242',
    //       "exp_month": 12,
    //       "exp_year": 2022,
    //       "cvc": "123"
    //   }
    // }).then((token)=>{
    //  await stripe.paymentIntents.create({ amount: 300, currency: "inr", payment_method_types: ['card'], description: "My First Test Charge.",})
    //   .then((data) => {
    //     console.log("data",data);
    //     return data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });
    // })


module.exports = { makePayment };

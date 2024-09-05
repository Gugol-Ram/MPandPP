const express = require("express");
const {
  createPayPalOrder,
  capturePayPalOrder,
} = require("../Controllers/PayPal/createOrderPP");
const paymentRouterPP = express.Router();

paymentRouterPP.post("/paypal/create-order", createPayPalOrder);
paymentRouterPP.post("/paypal/capture-order/:orderID", capturePayPalOrder);

module.exports = paymentRouterPP;

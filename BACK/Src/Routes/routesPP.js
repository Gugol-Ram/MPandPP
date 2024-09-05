const express = require("express");
const {
  createPayPalOrder,
  capturePayPalOrder,
} = require("../Controllers/PayPal/createOrderPP");
const paymentRouterPP = express.Router();

paymentRouterPP.post("/create-order", createPayPalOrder);
paymentRouterPP.post("/capture-order/:orderID", capturePayPalOrder);

module.exports = paymentRouterPP;

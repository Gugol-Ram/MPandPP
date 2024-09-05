const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const paymentRouterMP = require("./Routes/routesMP");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/mp-Payment", paymentRouterMP);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server listening" });
});

module.exports = app;

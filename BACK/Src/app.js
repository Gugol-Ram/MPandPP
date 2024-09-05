const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const paymentRouterMP = require("./Routes/routesMP");
const paymentRouterPP = require("./Routes/routesPP");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/mp-Payment", paymentRouterMP);
app.use("/pp-Payment", paymentRouterPP);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server listening" });
});

module.exports = app;

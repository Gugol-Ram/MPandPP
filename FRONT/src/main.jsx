import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import PayPalSuccessPay from "./Utils/PayPal/SuccessPage.jsx";
import PayPalFailurePay from "./Utils/PayPal/FailurePage.jsx";
import PayPalUnknowPay from "./Utils/PayPal/UnknowStatusPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pp-pay-success" element={<PayPalSuccessPay />} />
        <Route path="/pp-pay-failure" element={<PayPalFailurePay />} />
        <Route path="/pp-pay-unknow" element={<PayPalUnknowPay />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

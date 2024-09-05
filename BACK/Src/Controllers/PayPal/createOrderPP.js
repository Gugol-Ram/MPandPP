const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

//necesitamos generar credenciales para utilizar la API de PP
async function generateAccessToken() {
  const credentials = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  console.log(data.access_token);
  return data.access_token;
}

const createPayPalOrder = async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const cart = req.body.cart || [];
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD", //Si coloco ARS no lo toma devuelve array vacío, averiguar por qué⚠️
            value: totalPrice.toFixed(2), //pa que pingo el fixed¿
          },
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const order = await response.json();
    res.status(200).json({
      id: order.id,
      status: order.status,
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({ error: "Failed to create PP order" });
  }
};

const capturePayPalOrder = async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const orderID = req.params.id;
    console.log(req.params);

    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    res.status(500).json({ error: "Failed to capture PayPal order." });
  }
};

module.exports = {
  createPayPalOrder,
  capturePayPalOrder,
};

const mercadopago = require("mercadopago");
require("dotenv").config({ path: "./.env" });
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createOrder = (req, res) => {
  // const producto = req.body;
  const { id, title, price, description, image, quantity } = req.body;

  let preference = {
    items: [
      {
        id: id,
        title: title,
        description: description,
        picture_url: image,
        quantity: quantity,
        description: description,
        unit_price: price,
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: "http://localhost:3001/mp-Payment/success",
      failure: "http://localhost:3001/mp-Payment/failure",
      pending: "http://localhost:3001/mp-Payment/pending",
    },
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json({ message: error.message }));
  // console.log("esto es el preference:", preference);
  // console.log("la response:", response);
};

module.exports = createOrder;

import { useState } from "react";
import axios from "axios";

export default function Card({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const initialOptions = {
    "client-id": "...",
    currency: "USD",
  };

  const quantityDecrement = () => {
    quantity > 1 ? setQuantity(quantity - 1) : null;
  };

  // Pago PayPal
  const createPayPalOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/pp-Payment/create-order",
        {
          cart: [{ id: product.id, quantity, price: product.price }],
        }
      );
      setOrderId(response.data.id); // Guarda el ID de la orden en el estado

      return response.data.id; // Devuelve el ID de la orden para el siguiente paso
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePayPal = async () => {
    try {
      const orderID = await createPayPalOrder(); // Obtén el ID de la orden
      if (orderID) {
        window.location.href = `http://localhost:3001/payment/paypal/approve?orderID=${orderID}`;
      }
    } catch (error) {
      console.error("Error handling PayPal payment:", error);
    }
  };

  // Pago con Mercado Pago
  const checkOut = () => {
    axios
      .post("http://localhost:3001/payment/create-order", {
        ...product,
        quantity,
      })
      .then((response) => {
        window.location.href = response.data.body.init_point;
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div
      style={{
        backgroundColor: "grey",
        width: "400px",
        padding: "15px",
        margin: "15px",
      }}
    >
      <h1>{product.title}</h1>
      <img style={{ width: "150px" }} src={product.image} alt={product.title} />
      <h4>
        <strong>Precio: $</strong>
        {product.price}
      </h4>
      <h4>
        <strong>Descripción: </strong>
        {product.description}
      </h4>
      <h4>
        <strong>Stock: </strong>
        {product.stock}
      </h4>
      <h5>Cantidad: {quantity}</h5>
      <button style={{ margin: "5px" }} onClick={quantityIncrement}>
        +
      </button>
      <button style={{ margin: "5px" }} onClick={quantityDecrement}>
        -
      </button>
      <button style={{ margin: "5px" }} onClick={checkOut}>
        Pagar con Mercado Pago
      </button>
      <button onClick={handlePayPal}>Pagar con PayPal</button>
    </div>
  );
}

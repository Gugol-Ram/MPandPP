const express = require("express");
const createOrder = require("../Controllers/MP/createOrderMP");
const paymentRouterMP = express.Router();

// Orden de pago(para redirigir a la pagina de ML a pagar)
paymentRouterMP.post("/mp-create-order", createOrder);

// Segun la respuesta obtenida de MP:
paymentRouterMP.get("/success", (req, res) => {
  console.log("MercadoPago data: ", req.query);
  //deberia agregar logica para guardar codigo de transaccion en una BD; y logica para modificar el stock del producto si hubo exito en el pago
  res.redirect("http://localhost:5173/"); //redirijo a la ruta que quiero mostrar luego de que MP me devuelve el control, como no tengo otras lo redirijo a home, pero podria ser la que quiera/necesaria

  // res.status(200).json({ message: "Pago Aprobado" });Mensaje de prueba para mostrar "algo" mientras no tenia a donde redirigir
});
paymentRouterMP.get("/failure", (req, res) => {
  console.log("Mercado Pago Data: ", req.query);

  res.redirect("http://localhost:5173/");

  // res.status(200).json({ message: "Pago rechazado" });Mensaje de prueba para mostrar "algo" mientras no tenia a donde redirigir

  paymentRouterMP.get("/peding", (req, res) => {
    console.log("Mercado Pago DAta: ", req.query);

    res.redirect("http://localhost:5173/");

    // res.status(200).json({ message: "Pendiente" });Mensaje de prueba para mostrar "algo" mientras no tenia a donde redirigir
  });
});

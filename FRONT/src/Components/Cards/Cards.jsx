// import React from "react";
import products from "../../Utils/products";
import Card from "../Card/Card";

export default function Cards() {
  return (
    <div>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}

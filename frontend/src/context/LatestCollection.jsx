import React from "react";
import { useContext } from "react";
import { ShopContext } from "./ShopContext";

function LatestCollection() {
  const { products } = useContext(ShopContext);

  console.log(products);
  return <div></div>;
}

export default LatestCollection;

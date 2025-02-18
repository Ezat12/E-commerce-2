import React, { useEffect, useState } from "react";
import "./DisplayVegetable.css";
import Item from "../Items/Item";
import axios from "axios";

function DisplayVegetable() {
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/get-product`)
      .then((res) => setProduct(res.data.data));
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="display-vegetable">
      <h1>Fresh Vegetable</h1>
      <div className="container-content">
        {product.map((p, index) =>
          p.category === "Vegetable" ? (
            <Item
              key={index}
              id={p.id}
              name={p.name}
              category={p.category}
              image={p.image}
              price={p.price}
            ></Item>
          ) : null
        )}
      </div>
    </div>
  );
}

export default DisplayVegetable;

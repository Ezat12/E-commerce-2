import React, { useEffect, useRef, useState } from "react";
import "./DisplayProducts.css";
import axios from "axios";
import Item from "../Items/Item";

function DisplayProducts() {
  const [product, setProduct] = useState([]);
  const [details, setDetails] = useState("all");
  const [count, setCount] = useState(20);
  const getProduct = async () => {
    axios
      .get(`http://localhost:4000/get-product?limit=${count}`)
      .then((res) => setProduct(res.data.data));
  };

  useEffect(() => {
    getProduct();
  }, [count]);

  return (
    <div className="display-product">
      <h1>Related Product</h1>
      <ul className="categorys">
        <li onClick={() => setDetails("Fruits")} name="Fruits">
          <div className="picture"></div>
          <p>Fruits</p>
        </li>
        <li onClick={() => setDetails("Vegetable")} name="Vegetable">
          <div className="picture"></div>
          <p>Vegetable</p>
        </li>
        <li onClick={() => setDetails("Icream")} name="Icream">
          <div className="picture"></div>
          <p>Icream</p>
        </li>
        <li onClick={() => setDetails("Pizza")} name="Pizza">
          <div className="picture"></div>
          <p>Pizza</p>
        </li>
        <li onClick={() => setDetails("Cake")} name="Cake">
          <div className="picture"></div>
          <p>Cake</p>
        </li>
        <li onClick={() => setDetails("Rice")} name="Rice">
          <div className="picture"></div>
          <p>Rice</p>
        </li>
        <li onClick={() => setDetails("Burger")} name="Burger">
          <div className="picture"></div>
          <p>Burger</p>
        </li>
      </ul>
      <div className="container-product">
        {details === "all"
          ? product.map((p, index) => (
              <Item
                key={index}
                id={p.id}
                name={p.name}
                category={p.category}
                image={p.image}
                price={p.price}
              />
            ))
          : product.map((p, index) =>
              p.category === details ? (
                <Item
                  key={index}
                  name={p.name}
                  category={p.category}
                  image={p.image}
                  price={p.price}
                ></Item>
              ) : null
            )}
      </div>
      {count <= product.length ? (
        <p className="show" onClick={() => setCount(count + 20)}>
          show more...
        </p>
      ) : null}
    </div>
  );
}

export default DisplayProducts;

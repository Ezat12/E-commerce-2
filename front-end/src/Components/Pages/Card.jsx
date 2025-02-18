import React from "react";
import { useDispatch } from "react-redux";
import "../css/card.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  deletedProduct,
} from "../rtk/slices/productsSlice";
import axios from "axios";
import { toast } from "react-toastify";

function Card() {
  const dispatch = useDispatch();

  const productCard = useSelector((state) => state.products);

  const totalPrice = productCard.reduce((acc, curr) => {
    acc += curr.price * curr.Quantity;
    return acc;
  }, 0);
  const totalQun = productCard.reduce((acc, curr) => {
    acc += curr.Quantity;
    return acc;
  }, 0);

  // const total_price = products_All.reduce((acc, p) => {
  //   acc += p.Quantity * p.new_price;
  //   return acc;
  // }, 0);

  const clickPlus = (pro) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/add-products`, {
        token: localStorage.getItem("auth-token"),
        product: pro,
      })
      .then((res) => {
        dispatch(addProduct(pro));
        toast.success("success add", {
          position: "bottom-right",
        });
      });
  };

  const clickMinus = (pro) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/delete-product`, {
        token: localStorage.getItem("auth-token"),
        product: pro,
      })
      .then((res) => {
        dispatch(deleteProduct(pro));
        toast.success("success delete", {
          position: "bottom-right",
        });
      });
  };

  // const clickDelete = (pro) => {
  //   dispatch(deletedProduct(pro));
  // };

  return (
    <div className="card">
      <h1>Your Card Item</h1>
      <div className="container">
        <div className="items">
          {productCard.map((item, index) => (
            <div key={index} className="box-item">
              <div className="box-left">
                <div className="image">
                  <img src={item.image} alt="" />
                </div>
                <div className="info">
                  <p className="name">{item.name}</p>
                  <p className="category">{item.category}</p>
                  <div className="price">
                    <span>$</span>
                    {item.price}
                  </div>
                  <div className="icons">
                    <div className="plus">
                      <AiOutlinePlus onClick={() => clickPlus(item)} />
                    </div>
                    <span>{item.Quantity}</span>
                    <div className="minus">
                      <AiOutlineMinus onClick={() => clickMinus(item)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-right">
                <div className="total">
                  Totle : <span className="dolar">$</span>
                  <span className="total-price">
                    {item.Quantity * item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <div className="summary">Summary</div>
          <div className="totla-qty">
            Total Qty: <span className="qty">{totalQun}</span>
          </div>
          <div className="totla-qty">
            Total Price:{" "}
            <span className="total-price">
              <span className="dular">$</span>
              {totalPrice}
            </span>
          </div>
          <div className="payment">Payment</div>
        </div>
      </div>
    </div>
  );
}

export default Card;

import React from "react";
import "./Item.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import axios from "axios";
import { addProduct } from "../Components/rtk/slices/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Item(props) {
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const clickAddCard = (pro) => {
    if (user.email === "") {
      toast.error("You must be logged in", {
        position: "top-center",
      });
      navigator("/signuplogin");
    } else {
      axios
        .post("http://localhost:4000/add-products", {
          token: localStorage.getItem("auth-token"),
          product: pro,
        })
        .then((res) => {
          toast.success("success add product", {
            position: "bottom-right",
          });

          dispatch(addProduct(pro));
        });
    }
  };

  return (
    <div className="item">
      <img src={props.image} alt="" />
      <div>
        <p className="title">{props.name}</p>
        <span className="item-catogery">{props.category}</span>
        <div className="price">
          <span>$</span>
          {props.price}
        </div>
        <button onClick={() => clickAddCard(props)}>Add Card</button>
      </div>
    </div>
  );
}

export default Item;

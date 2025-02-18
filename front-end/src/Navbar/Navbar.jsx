import logo from "../Components/assest/logo.png";
import card_img from "../Components/assest/cart_icon.png";
import profile_img from "../Components/assest/profile.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../Components/rtk/slices/userSlice";
import { addProduct } from "../Components/rtk/slices/productsSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const login = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("auth-token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          toast(data.data, {
            style: {
              background: "#dc3545",
              color: "#fff",
            },
          });
        } else {
          toast("success login", {
            style: {
              background: "#28a745",
              color: "#fff",
            },
          });
          localStorage.setItem("auth-token", data.data.token);

          dispatch(loginUser(data.data.user));

          const userCardData = data.data.user.cardData;

          userCardData.map((item) => dispatch(addProduct(item)));
          // navigator("/");
        }
      });
  };
  if (localStorage.getItem("auth-token")) {
    // login();
  }

  // window.location.reload("/")

  const productCard = useSelector((state) => state.products);

  const userDate = useSelector((state) => state.user);
  console.log(userDate);

  const [menu, setMenu] = useState("");

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li className="links">
          <span>
            <Link style={{ textDecoration: "none", color: "#000" }} to={"/"}>
              Home
            </Link>
          </span>
          <span>Menu</span>
          <span>About</span>
          <span>Content</span>
        </li>
        <Link to={"/card"} className="img-card">
          <img src={card_img} alt="" />
          <span>{productCard.length}</span>
        </Link>
        {!userDate.image ? (
          <Link to={"/signuplogin"}>
            <img className="img-profile" src={profile_img} alt="" />
          </Link>
        ) : (
          <Link to={"/profile"}>
            <img className="img-profile" src={userDate.image} alt="" />
          </Link>
        )}
      </ul>
      {menu === "" ? (
        <IoMdMenu
          className="menu"
          onClick={(e) => {
            e.currentTarget.parentElement.classList.toggle("view");
            setMenu("x");
          }}
        />
      ) : (
        <MdClose
          className="menu"
          onClick={(e) => {
            e.currentTarget.parentElement.classList.toggle("view");
            setMenu("");
          }}
        />
      )}
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import "../css/login.css";
import login_img from "../assest/login-animation.gif";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../rtk/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../rtk/slices/productsSlice";
import { PropagateLoader } from "react-spinners";

function SignupOrLogin() {
  const [check, setCheck] = useState("Sign Up");
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const changeImages = async (e) => {
    // const data = await ImageToBase64(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const signUp = async () => {
    setAccept(true);

    if (
      firstName !== "" &&
      email !== "" &&
      lastName !== "" &&
      password !== ""
    ) {
      if (email.slice(1).includes("@")) {
        let formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        setLoading(true);
        axios
          .post("http://localhost:4000/signup", formData)
          .then((res) => {
            const data = res.data;
            if (data.status === "success") {
              toast("Success sign up", {
                style: {
                  background: "#28a745",
                  color: "#fff",
                },
              });
              navigator("/");
              dispatch(loginUser(data.data.user));
              localStorage.setItem("auth-token", data.data.token);
            }
          })
          .catch((error) => {
            const dataError = error.response.data.data;
            toast(dataError, {
              style: {
                background: "#dc3545",
                color: "#fff",
              },
            });
          });
        setLoading(false);
      } else {
        toast("please include an '@' in the email address", {
          style: {
            background: "#dc3545",
            color: "#fff",
          },
        });
      }
    }
  };

  const login = async () => {
    setAccept(true);

    if (email !== "" && password !== "") {
      setLoading(true);
      await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
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
            setLoading(false);
          } else {
            toast("success login", {
              style: {
                background: "#28a745",
                color: "#fff",
              },
            });
            setLoading(false);
            localStorage.setItem("auth-token", data.data.token);

            dispatch(loginUser(data.data.user));

            const userCardData = data.data.user.cardData;

            userCardData.map((item) => dispatch(addProduct(item)));
            navigator("/");
          }
        });
    }
  };

  return (
    <div className="signup-login">
      <div className="container-feild">
        <h1 style={{ textAlign: "center" }}>{check}</h1>
        {check === "Sign Up" ? (
          <div className="input-img">
            <label htmlFor="login">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="" />
              ) : (
                <img src={login_img} alt="" />
              )}
            </label>
            <input
              accept="images/*"
              onChange={changeImages}
              id="login"
              type="file"
              hidden
            />
          </div>
        ) : null}
        {check === "Sign Up" ? (
          <div className="name">
            <div className="input-feild">
              <label>First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter here"
                className={firstName === "" && accept ? "required" : null}
              />
            </div>
            <div className="input-feild">
              <label>Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter here"
                className={lastName === "" && accept ? "required" : null}
              />
            </div>
          </div>
        ) : null}
        <div className="input-feild">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter here"
            required
            className={email === "" && accept ? "required" : null}
          />
        </div>
        <div className="input-feild">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter here"
            className={password === "" && accept ? "required" : null}
          />
        </div>
        <button
          type="submit"
          className="btn-login"
          onClick={() => (check === "Sign Up" ? signUp() : login())}
        >
          {loading ? <PropagateLoader color="#fff" /> : "Continue"}
        </button>
        {check === "Sign Up" ? (
          <div className="check-login">
            <p>Already have an account?</p>
            <span onClick={() => setCheck("Login")}>login here</span>
          </div>
        ) : (
          <div className="check-login">
            <p> Create an account?</p>
            <span onClick={() => setCheck("Sign Up")}>Sign up here</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupOrLogin;

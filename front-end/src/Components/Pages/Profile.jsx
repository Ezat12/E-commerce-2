import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/profile.css";
import profile_img from "../assest/profile.jpg";
import { ImageToBase64 } from "../ImageToBase64";
import { loginUser } from "../rtk/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { removeAllProduct } from "../rtk/slices/productsSlice";


function Profile() {
  const dataUser = useSelector((state) => state.user);
  const navigator = useNavigate();

  const dispatch = useDispatch();

  const [data, setDate] = useState({
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
    email: dataUser.email,
    password: dataUser.password,
    image: dataUser.image,
  });

  // const [firstName, setFirstName] = useState(dataUser.firstName);
  // const [lastName, setLastName] = useState(dataUser.firstName);
  // const [email, setFEmail] = useState(dataUser.firstName);
  // const [password, setPassword] = useState(dataUser.firstName);
  // const [image, setImage] = useState(dataUser.firstName);


  const changeImages = async (e) => {
    const dataImage = await ImageToBase64(e.target.files[0]);
    // setImage(dataImage);

    setDate((preve) => {
      return {
        ...preve,
        [e.target.name]: dataImage,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDate((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const update = async () => {
    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/update`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const setdata = await fetchData.json();
    if (setdata.status === "success") {
      dispatch(loginUser(setdata.data.user));
      navigator("/");
      toast("update success", {
        style: {
          background: "#28a745",
          color: "#fff",
        },
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    dispatch(loginUser({}));

    navigator("/");
    toast("logout success", {
      style: {
        background: "#28a745",
        color: "#fff",
      },
    });
    dispatch(removeAllProduct());
  };

  return (
    <div className="profile">
      <div className="profile-content">
        <h1>Profile</h1>
        <div className="form-data">
          <div className="image">
            <label htmlFor="image-profile">
              <img src={!data.image ? profile_img : data.image} alt="" />{" "}
            </label>
            <input
              id="image-profile"
              name="image"
              onChange={changeImages}
              type="file"
              hidden
            />
          </div>
          <div className="name">
            <div className="input-feild">
              <label htmlFor="">First Name</label>
              <input
                name="firstName"
                type="text"
                onChange={handleChange}
                value={data.firstName}
              />
            </div>
            <div className="input-feild">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
              />
            </div>
          </div>

          <div className="input-feild">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <div className="buttons">
            <button className="update" onClick={() => update()}>
              Update Profile
            </button>
            <button className="logout" onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

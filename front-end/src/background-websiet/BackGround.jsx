import React from "react";
import bike_img from "../Components/assest/bike.jpeg";
import "./BackGround.css";
import img_amaranthus from "../Components/assest/show/amaranthus 1 bunch - vegetables.jpg";
import img_kiwi from "../Components/assest/show/baby kiwi - fruits.jpg";
import img_basmati from "../Components/assest/show/basmati-rice-png.png";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";

function BackGround() {

  

  return (
    <div className="background">
      <div className="left">
        <div className="delivery">
          <p>Bike Delivery</p>
          <img src={bike_img} alt="" />
        </div>
        <div className="content">
          <h1>
            The Fasted Delivery in <span>Your Home</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis,
            inventore voluptas aut quia mollitia quidem atque quae voluptatum,
            qui obcaecati odit voluptatibus cumque. Odio mollitia asperiores
            animi omnis, et itaque.
          </p>
          <button>Order Now</button>
        </div>
      </div>
      <div className="right">
        <div className="right-content">
          <div className="box">
            <img src={img_amaranthus} alt="" />
            <div>
              <p className="title">Amaranthus 1 Bunch</p>
              <span className="item">Vegetable</span>
              <div className="price">
                <span>$</span>20
              </div>
            </div>
          </div>
          <div className="box">
            <img src={img_kiwi} alt="" />
            <div>
              <p className="title">Babu Kiwi</p>
              <span className="item">Fruits</span>
              <div className="price">
                <span>$</span>65
              </div>
            </div>
          </div>
          <div className="box">
            <img src={img_basmati} alt="" />
            <div>
              <p className="title">Basmati Rice</p>
              <span className="item">Rice</span>
              <div className="price">
                <span>$</span>102
              </div>
            </div>
          </div>
          <div className="box">
            <img src={img_amaranthus} alt="" />
            <div>
              <p className="title">Amaranthus 1 Bunch</p>
              <span className="item">Vegetable</span>
              <div className="price">
                <span>$</span>20
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackGround;

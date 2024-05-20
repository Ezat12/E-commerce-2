import React from "react";
import "./Footer.css";
import logo_img from "../Components/assest/logo.png";
import payment_img from "../Components/assest/payment/payment.png";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer">
      <div className="grab">
        <img src={logo_img} alt="" />
        <div className="submit">
          <h2>Garb a Product of news</h2>
          <div className="feild">
            <input type="text" placeholder="Email" />
            <span>Sign Up</span>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            sunt hic minus error!
          </p>
        </div>
      </div>
      <div className="plateforms">
        <div className="payment">
          <img src={payment_img} alt="" />
        </div>
        <div className="links">
          <ul>
            <li>
              <MdEmail />
            </li>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaLinkedin />
            </li>
            <li>
              <FaXTwitter />
            </li>
            <li>
              <FaYoutube />
            </li>
          </ul>
          <p>@2030</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

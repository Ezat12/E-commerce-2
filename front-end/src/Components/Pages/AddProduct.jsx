import React, { useState } from "react";
import "../css/addProduct.css";
import img_upload from "../assest/upload.jpg";
import axios from "axios";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    category: "Fruits",
    image: "",
    price: "",
    description: "",
  });

  const handleChangr = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const changgeImage = async (e) => {
    const dataImage = e.target.files[0];

    setData((preve) => {
      return {
        ...preve,
        [e.target.name]: dataImage,
      };
    });
  };

  const addProduct = async () => {
    let formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      formData.append(key, value);
    });

    console.log(formData.get("image"));
    axios
      .post("http://localhost:4000/add-product", formData)
      .then((res) => console.log(res));
  };

  return (
    <div className="add-products">
      <div className="form-product">
        <div className="feild-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChangr}
            value={data.name}
          />
        </div>
        <div className="feild-input">
          <label htmlFor="category">Category</label>
          <select value={data.category} name="category" onChange={handleChangr}>
            <option>Fruits</option>
            <option>Vegetable</option>
            <option>Icream</option>
            <option>Pizza</option>
            <option>Cake</option>
            <option>Rice</option>
            <option>Burger</option>
          </select>
        </div>
        <div className="feild-input">
          <p>Image</p>
          <label className="image" htmlFor="image">
            <img
              src={!data.image ? img_upload : URL.createObjectURL(data.image)}
              alt=""
            />
          </label>
          <input
            id="image"
            name="image"
            onChange={changgeImage}
            type="file"
            hidden
          />
        </div>
        <div className="feild-input">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            onChange={handleChangr}
            value={data.price}
          />
        </div>
        <div className="feild-input">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleChangr}
            value={data.description}
          />
        </div>
        <button className="btn-save" onClick={() => addProduct()}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddProduct;

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const compression = require("compression");
const signup = require("./Controllers/controller-user").signup;
const login = require("./Controllers/controller-user").login;
const update = require("./Controllers/controller-user").update;
const addProduct_toProducts =
  require("./Controllers/controller-product").addProduct_toProducts;
const getProduct = require("./Controllers/controller-product").getProduct;
const addProducts = require("./Controllers/controller-product").addProducts;
const deleteProduct = require("./Controllers/controller-product").deleteProduct;
const upload = require("./Middleware/multer");
const Products = require("./Models/modelProduts");

require("dotenv").config();

url = process.env.URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("Data is Ready");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("Upload"));

// signup
app.post("/signup", upload.single("image"), signup);
// login
app.post("/login", login);
// update
app.post("/update", update);

app.post("/add-product", upload.single("image"), addProduct_toProducts);

app.get("/get-product", getProduct);

app.post("/add-products", addProducts);

app.post("/delete-product", deleteProduct);

app.listen(4000, () => {
  console.log("the server listen is Ready");
});

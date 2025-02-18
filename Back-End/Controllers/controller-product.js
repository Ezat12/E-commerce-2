// const Products = require("../Models/modelProduts");
// const User = require("../Models/modelUsers");
// const cloudImg = require("../Middleware/cloudinary");
// const jwt = require("jsonwebtoken");
// const jsend = require("jsend");
const Products = require("../Models/modelProduts");
const User = require("../Models/modelUsers");
const cloudImg = require("../Middleware/cloudinary");
const jwt = require("jsonwebtoken");
const jsend = require("jsend");

const addProduct_toProducts = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const { file } = req;

    if (!file) return res.status(400).json(jsend.error("No file uploaded"));

    const resultImg = await cloudImg.uploadBuffer(file.buffer);

    let theId = 1;
    const findProducts = await Products.find({});
    if (findProducts.length > 0) {
      theId = findProducts[findProducts.length - 1].id + 1;
    }

    const newProduct = new Products({
      id: theId,
      name,
      category,
      image: resultImg.secure_url,
      price,
      description,
    });

    await newProduct.save();

    res.status(201).json(jsend.success("Product added successfully"));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// const addProduct_toProducts = async (req, res) => {
//   const { name, category, price, description } = req.body;
//   const { file } = req;
//   const resultImg = await cloudImg.uploads(file.path);
//   let theId = 1;

//   const findProduts = await Products.find({});

//   if (findProduts.length > 0) {
//     const endProduct = findProduts.slice(-1)[0];

//     theId = endProduct.id + 1;
//   }

//   const newProduct = new Products({
//     id: theId,
//     name,
//     category,
//     image: resultImg.url,
//     price,
//     description,
//   });

//   await newProduct.save();

//   res.status(201).json("Success");
// };

const getProduct = async (req, res) => {
  const query = req.query;
  const limit = query.limit;
  const skip = query.skip;

  const allProduct = await Products.find({}).limit(limit);

  res.json(jsend.success(allProduct));
};

// add Products
const addProducts = async (req, res) => {
  const { product, token } = req.body;

  const currentToken = jwt.verify(token, process.env.JWT_SECRT_KEY);
  const email = currentToken.email;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    return res.json(jsend.error("The Token is not Correct"));
  } else {
    let found = false;
    for (let i = 0; i < findUser.cardData.length; i++) {
      if (findUser.cardData[i].id == req.body.product.id) {
        findUser.cardData[i].Quantity += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      req.body.product = { ...req.body.product, Quantity: 1 };
      findUser.cardData.push(req.body.product);
    }

    await User.findOneAndUpdate({ email }, { cardData: findUser.cardData });
    const user = await User.findOne({ email });
    return res.json(jsend.success(user.cardData));
  }
};

// delete Prodect
const deleteProduct = async (req, res) => {
  const { product, token } = req.body;

  const currentToken = jwt.verify(token, process.env.JWT_SECRT_KEY);
  const email = currentToken.email;

  const user = await User.findOne({ email });
  console.log(user.cardData);

  for (let i = 0; i < user.cardData.length; i++) {
    if (user.cardData[i].id === product.id) {
      if (user.cardData[i].Quantity > 1) {
        user.cardData[i].Quantity -= 1;
        break;
      } else {
        user.cardData.splice(i, 1);
        break;
      }
    }
  }

  await User.findOneAndUpdate({ email }, { cardData: user.cardData });
  const userUpdate = await User.findOne({ email });
  return res.json(jsend.success(userUpdate.cardData));
};

module.exports = {
  addProduct_toProducts,
  getProduct,
  addProducts,
  deleteProduct,
};

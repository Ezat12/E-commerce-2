const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  Quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Products", productSchema);

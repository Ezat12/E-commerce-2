const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "the email is already token"],
  },
  password: {
    type: String,
    required: true,
  },
  cardData: {
    type: Array,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);

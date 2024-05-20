const User = require("../Models/modelUsers");
const jsend = require("jsend");
const cloudImg = require("../Middleware/cloudinary");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { file } = req;
  let resultImg;
  if (file) {
    resultImg = await cloudImg.uploads(file.path);
  }

  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    return res.status(401).json(jsend.fail("the email is already token"));
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    cardData: [],
    image: file
      ? resultImg.url
      : "https://zeru.com/blog/wp-content/uploads/How-Do-You-Have-No-Profile-Picture-on-Facebook_25900",
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_SECRT_KEY
  );

  res.json(jsend.success({ token, user: newUser }));
};

const login = async (req, res) => {
  const { email, password, token } = req.body;

  let theEmail;
  let currentToken;

  if (token) {
    currentToken = jwt.verify(token, process.env.JWT_SECRT_KEY);
    theEmail = currentToken.email;

    const findUser = await User.findOne({ email: theEmail });

    if (findUser) {
      res.status(201).json(jsend.success({ token, user: findUser }));
    } else {
      res.status(401).json(jsend.fail("the token is not correct"));
    }
  } else {
    const findUser = await User.findOne({ email });

    if (findUser) {
      if (password == findUser.password) {
        const token = jwt.sign(
          { id: findUser._id, email: findUser.email },
          process.env.JWT_SECRT_KEY
        );

        res.status(201).json(jsend.success({ token, user: findUser }));
      } else {
        res.status(400).json(jsend.fail("the password is not correct"));
      }
    } else {
      res.status(401).json(jsend.fail("the email is not correct"));
    }
  }
};
const update = async (req, res) => {
  const { email, firstName, lastName, password, image } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    await User.findOneAndUpdate(
      { email },
      { firstName, lastName, password, image }
    );

    const userUpdate = await User.findOne({ email });

    res.status(201).json(jsend.success({ user: userUpdate }));
  }
};

module.exports = {
  signup,
  login,
  update,
};

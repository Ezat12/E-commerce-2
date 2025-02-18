// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "./Upload",
//   filename: (req, file, cb) => {
//     const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
//     return cb(null, fileName);
//   },
// });

// module.exports  = multer({ storage: storage });

const multer = require("multer");

const storage = multer.memoryStorage(); 
module.exports = multer({ storage });


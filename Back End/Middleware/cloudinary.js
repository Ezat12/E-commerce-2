const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dult28qzc",
  api_key: "923123296485422",
  api_secret: "4be27AeNcLEddw_A8VmL0ZYcS_s",
});

module.exports = {
  uploads: (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(
        file,
        (result) => {
          resolve({ url: result.url }, { id: result.public_id });
        },
        { resource_type: "auto" }
      );
    });
  },
};

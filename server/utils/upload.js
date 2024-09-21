const { Readable } = require("stream");
const cloudinary = require("../database/cloudinary.config");

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    });

    const stream = Readable.from(file.buffer);
    stream.pipe(uploadStream);
  });
};

module.exports = uploadImage;

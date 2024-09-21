const uploadImage = require("../utils/upload");

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = await uploadImage(req.file);

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Image upload error: ", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
};

module.exports = {uploadImageController}
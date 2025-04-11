// controllers/aboutMeController.js
import { about } from "../model/abouMeschema.js";
import { cloudinaryUpload } from "../Cloudinary/cloudinary.js";

export const aboutMe = async (req, res) => {
  try {
    const { file } = req;

    if (!file || !file.buffer) {
      return res
        .status(400)
        .json({ message: "No file data found", success: false });
    }

    const imgUrl = await cloudinaryUpload(
      file.buffer,
      file.originalname.trim()
    );

    if (!imgUrl) {
      return res
        .status(500)
        .json({ message: "Error uploading image", success: false });
    }

    let aboutMeDoc = await about.findOne();
    if (!aboutMeDoc) {
      aboutMeDoc = new about({
        aboutMeImage: [imgUrl],
      });
    } else {
      aboutMeDoc.aboutMeImage.push(imgUrl);
    }
    await aboutMeDoc.save();
    res.json({
      message: "Image upload success",
      imageUrl: imgUrl,
      success: true,
    });
  } catch (error) {
    console.log("Error while uploading image for About Me:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const aboutImage = async (req, res) => {
  try {
    const imageData = await about.findOne();
    if (!imageData) {
      return res
        .status(404)
        .json({ message: "Document not found", success: false });
    }
    res.json({ imageData, success: true });
  } catch (error) {
    console.log("Error while fetching About Me data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

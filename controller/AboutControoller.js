import { about } from "../model/abouMeschema.js";
import { cloudinaryUpload } from "../Cloudinary/cloudinary.js";
export const aboutMe = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ message: "No file provided", success: false });
    }

    const path = file?.path;
    if (!path) {
      return res
        .status(400)
        .json({ message: "File path not found", success: false });
    }

    const imgUrl = await cloudinaryUpload(path);

    if (!imgUrl) {
      return res
        .status(500)
        .json({ message: "Error uploading image", success: false });
    }

    const aboutMeDoc = await about.findOne();
    if (!aboutMeDoc) {
      return res
        .status(404)
        .json({ message: "AboutMe document not found", success: false });
    }
    aboutMeDoc.aboutMeImage.push(imgUrl);
    await aboutMeDoc.save();

    res.json({ message: "Image upload success", success: true });
  } catch (error) {
    console.log("Error while uploading image for About Me:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const aboutImage = async (req, res) => {
  try {
    const imageData = await about.findOne();
    if (!imageData) {
      return res.json({ message: "Document not found", success: false });
    }
    res.json({ imageData, success: true });
  } catch (error) {
    console.log("error while fecth about data");
    s;
  }
};

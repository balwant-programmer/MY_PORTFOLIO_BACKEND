import { cloudinaryUpload } from "../Cloudinary/cloudinary.js";
import { blog } from "../model/BlogSchema.js";
import path from "node:path";
export const adminBlog = async (req, res) => {
  try {
    const { description } = req.body;
    const file = req.file;

    if (!description) {
      return res
        .status(404)
        .json({ message: "Description required!", success: false });
    }

    if (!file) {
      return res
        .status(404)
        .json({ message: "File not found!", success: false });
    }

    const extension = path.extname(file?.originalname);

    if (extension !== ".js") {
      return res
        .status(404)
        .json({ message: "file only extension .js", success: false });
    }

        const filename = crypto?.randomUUID() + path?.extname(req?.file?.originalname);
    
    const fileurl = await cloudinaryUpload(file?.buffer ,filename);
  

    if (!fileurl) {
      return res.status(404).json({
        message: "Cloudinary did not return a file",
        success: false,
      });
    }

    const post = new blog({ BlogFile: fileurl, description });
    await post.save();
    return res.status(200).json({
      message: "Blog post created successfully!",
      success: true,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};

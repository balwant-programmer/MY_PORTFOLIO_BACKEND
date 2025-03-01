import { blog } from "../model/BlogSchema.js";
import axios from "axios";

export const allBlog = async (req, res) => {
  try {
    const allblog = await blog.find();

    if (!allblog || allblog.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found", success: false });
    }

    const blogData = await Promise.all(
      allblog.map(async ({ BlogFile, description, like, _id }) => {
        try {
          const fileResponse = await axios.get(BlogFile, {
            responseType: "arraybuffer",
          });

          return {
            filedata: fileResponse?.data,
            like: like,
            description: description,
            _id: _id,
          };
        } catch (fileError) {
          console.error("Error fetching file:", fileError);
          return { filedata: null, description, error: fileError.message };
        }
      })
    );

    const value = blogData?.map(({ filedata, like, description, _id }) => {
      return {
        data: filedata?.toString("utf-8"),
        like: like,
        description: description,
        id: _id,
      };
    });
    res.json(value);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

//  ------ Blog Delete ---

export const blogDeleted = async (req, res) => {
  try {
    const { id } = req?.params;
    if (!id)
      return res
        .status(404)
        .json({ message: "Delete failed !", success: false });
    const deletheBlog = await blog.deleteOne({ _id: id });
    if (deletheBlog?.deletedCount === 1) {
      return res.status(200).json({ message: "Deleted Succes", success: true });
    }
  } catch (error) {
    console.log("Error while getting the Delete the Blogs", error);
  }
};

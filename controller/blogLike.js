import { blog } from "../model/BlogSchema.js";

export const blogLike = async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.body;
  if (!userId) {
    return res
      .status(404)
      .json({ message: "User not register", success: false });
  }
  if (!postId) {
    return res
      .status(404)
      .json({ message: "Blogs Not found !", success: false });
  }
  const singleBlog = await blog.updateOne(
    { _id: postId },
    { $addToSet: { like: userId } }
  );
  const { modifiedCount } = singleBlog;
  res.json({ message: "liked", sucesss: true, modifiedCount: modifiedCount });
};

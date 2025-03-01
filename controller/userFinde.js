import { cloudinaryUpload } from "../Cloudinary/cloudinary.js";
import { User } from "../model/userSchema.js";
import path from 'node:path'
export const user = async (req, res) => {
  const { id } = req.user;
  if (!id) return;
  const user = await User.findOne({ _id: id });
  if (!user) return;
  const { username, email, logo, _id } = user;
  res.status(201).json({ username, email, logo, userId: _id, success: true });
};
export const UserImageUpadte = async (req, res) => {
  try {
    const file = req.file;

     const filename = crypto?.randomUUID() + path?.extname(req?.file?.originalname);
       
    const updateUrl = await cloudinaryUpload(file?.buffer ,filename);
    const { id } = req.user;

    const user = await User.updateOne(
      { _id: id },
      { $set: { logo: updateUrl } },
      { new: true }
    );

    if (!user?.acknowledged) {
      return res.json({ message: "Server Error", success: false });
    }

    const updatedUser = await User.findById(id);
    res.json({ success: true, user: updatedUser?.logo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

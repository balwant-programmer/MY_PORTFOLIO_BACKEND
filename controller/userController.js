import { cloudinaryUpload } from "../Cloudinary/cloudinary.js";
import { User } from "../model/userSchema.js";
import { passwordHash } from "../SecurePassword/securePassword.js";
import path from "node:path";
export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if ([username, password, email].some((ele) => ele.trim() === "")) {
      return res.json({ message: "Please fill the form", success: false });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.json({ message: "invalid credentials", success: false });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "User already registered", success: false });
    }

    if (password.length <= 6) {
      return res.json({
        message: "Password must be greater than 6 characters",
        success: false,
      });
    }

    const hashedPassword = await passwordHash(password);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    const file = req?.file;
    if (file) {
      const filename =
        crypto?.randomUUID() + path?.extname(req?.file?.originalname);
      const logo = await cloudinaryUpload(file?.buffer, filename);
      await User.updateOne({ _id: newUser._id }, { $set: { logo: logo } });
    }

    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log("Error while getting the registration");
    throw new Error(error.message);
  }
};

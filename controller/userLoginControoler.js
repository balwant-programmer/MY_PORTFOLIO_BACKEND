import { TokeneLization } from "../MiddleWare/jsonwebToken.js";
import { User } from "../model/userSchema.js";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Credentials not found", success: false });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User not registered", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Incorrect credentials", success: false });
    const token = await TokeneLization(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        username: user.username,
        email: user.email,
        image: user.logo,
        token: token,
      },
    });
  } catch (error) {
    console.log("Login error", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const logout = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return;
  }
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successfully", success: true });
};

// ----------user Credantial update...

export const userUpadetCredatial = async (req, res) => {
  try {
    const { newEmail, newUsername } = req?.body;
    if (!newEmail || !newUsername)
      return res
        .status(404)
        .json({ message: "not found crediantial", success: false });
    const { id: userId } = req?.params;
    if (!userId)
      return res
        .status(404)
        .json({ message: "not found user Id", success: false });

    const updateData = await User?.findByIdAndUpdate(
      userId,
      {
        email: newEmail,
        username: newUsername,
      },
      { new: true }
    );

    return res.json({ message: "update success", success: true, updateData });
  } catch (error) {
    console.log(
      "Errro while gettting the message of updte the user Creadiantial",
      error
    );
    return res.status(500).json("Internale server error");
  }
};

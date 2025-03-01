import jwt from "jsonwebtoken";
export const senderToken = (req, res, next) => {
  const token = req?.cookies?.senderToken;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Token is required", success: false });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid or expired" });
    }

    req.user = user;
    next();
  });
};

import jwt from "jsonwebtoken";

export const TokeneLization = async (user) => {
  try {
    const expiration = process.env.JWT_EXPIRES || "1h";
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "JWT secret key is not defined in environment variables."
      );
    }
    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = await jwt.sign(payload, secretKey, {
      expiresIn: expiration,
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Token generation failed.");
  }
};

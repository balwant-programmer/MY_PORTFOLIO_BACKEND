import bcrypt from "bcrypt";

export const passwordHash = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

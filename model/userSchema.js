import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  logo: {
    type: String,
    require: true,
    default:
      "https://res.cloudinary.com/dfdszghgs/image/upload/v1738985946/logo/evm9z43iwc5anvccz21l.png",
  },
});

export const User = mongoose.model("User", userSchema);

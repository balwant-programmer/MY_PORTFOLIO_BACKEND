import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  herologo: {
    type: String,
    required: true,
  },
});

export const herosectionLogo = mongoose.model("Logo", logoSchema);

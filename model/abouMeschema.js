import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema({
  aboutMeImage: {
    type: Array,
    default: [],
  },
});

export const about = mongoose.model("AboutMe", aboutMeSchema);

// model/abouMeschema.js
import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema({
  aboutMeImage: {
    type: [String],
    default: [],
  },
});

export const about = mongoose.model("AboutMe", aboutMeSchema);

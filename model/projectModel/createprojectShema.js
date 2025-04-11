import mongoose from "mongoose";
const projectShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  Technology: {
    type: [String],
    required: true,
  },
  introduction: {
    type: String,
  },
  deploy: {
    type: [String],
    required: true,
  },
  websiteLink: {
    type: String,
    required: true,
  },
});
export const project = mongoose.model("Project", projectShema);

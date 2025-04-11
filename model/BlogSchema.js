import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  BlogFile: {
    type: String,
  },
  like: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
  },
});

export const blog = mongoose.model("Blog", blogSchema);

import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  resume: {
    type: String,
    required: true,
  },
});

export const resumeModel = mongoose.model("Resume", logoSchema);

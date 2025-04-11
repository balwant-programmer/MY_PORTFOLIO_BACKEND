import mongoose from "mongoose";
const bkgShema = mongoose.Schema({
  name: {
    type: String,
  },
  senderId: {
    type: [String],
  },

  message: {
    type: [String],
  },
});

export const bkg = mongoose.model("Bkg", bkgShema);

import mongoose from "mongoose";
const videoShema = new mongoose.Schema({
  video: {
    type: String,
    required: true,
  },
});

const videoModel = mongoose.model("Vidoe", videoShema);
export default videoModel;

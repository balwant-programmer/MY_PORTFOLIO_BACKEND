import mongoose from "mongoose";

const sendSchema = new mongoose.Schema({
  sms: {
    type: [String],
  },
  senderId: {
    type: String,
  },
  senderName: {
    type: String,
  },
  bkgsms: {
    type: [String],
  },
});

export const sender = mongoose.model("Sender", sendSchema);

import { bkg } from "../model/bkgSmsrecivedSchma.js";
import { sender } from "../model/sendSmeSchema.js";
export const recviedsms = async (req, res) => {
  try {
    const bkgFind = await bkg.findOne();

    if (!bkgFind)
      return res.status(404).json({ message: "bkg not found", success: false });

    const senderId = bkgFind?.senderId;
    const sendermessages = await Promise.all(
      senderId.map(async (sendId) => {
        const sendermessage = await sender.find({ _id: sendId });
        return sendermessage;
      })
    );

    let senderUSer = [];
    sendermessages.map((senerUSer) => {
      senerUSer.forEach((senerData) => {
        senderUSer.push(senerData);
      });
    });

    res.status(200).json({
      message: "revieded sms  bkg near",
      success: true,
      senderUSer,
    });
  } catch (error) {
    console.log("error message", error);
  }
};

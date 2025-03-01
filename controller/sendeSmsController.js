import { bkg } from "../model/bkgSmsrecivedSchma.js";
import { sender } from "../model/sendSmeSchema.js";

export const sendSms = async (req, res) => {
  try {
    const { id } = req.user;
    const { sms } = req.body;
    if (!id)
      return res
        .status(404)
        .json({ message: "sender not register", success: false });
    if (!sms)
      return res
        .status(404)
        .json({ message: "not send any message", success: false });

    const findThSender = await sender.findOne({ _id: id });
    if (!findThSender)
      return res
        .status(404)
        .json({ message: "senduser not found", success: false });

    findThSender?.sms?.push(sms);
    await findThSender.save();

    res?.status(200)?.json({
      message: "send sms success full",
      success: true,
      sms: findThSender?.sms,
    });
  } catch (error) {
    console.log("error while getting", error);
  }
};

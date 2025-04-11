import { sender } from "../model/sendSmeSchema.js";

export const getSmsOftheSender = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id)
      return res.status(200).json({ message: "id required !", success: false });

    const senderSms = await sender.findOne({ _id: id });

    if (!senderSms)
      return res.status(404).json({ message: "sender not Found" });
    res.status(200).json({
      message: "comminng data",
      success: true,
      sms: senderSms?.sms,
    });
  } catch (error) {
    console.log("error while getting", error);
  }
};

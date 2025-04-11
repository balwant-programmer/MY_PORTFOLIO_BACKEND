import { TokeneLization } from "../MiddleWare/jsonwebToken.js";
import { sender } from "../model/sendSmeSchema.js";
import { faker } from "@faker-js/faker";
export const loginSender = async (req, res) => {
  try {
    const { sms } = req.body;
    const { id } = req.params;
    const sendUser = await sender.findOne({ senderId: id });
    if (sendUser) {
      return res
        .status(404)
        .json({ message: "already login sender", success: false });
    }
    const createsnder = new sender({
      sms,
      senderId: id,
      senderName: faker.person.firstName(),
    });
    await createsnder.save();
    const senderToken = await TokeneLization(createsnder._id);
    if (!senderToken) {
      return res
        .status(404)
        .json({ message: "token not found !", success: false });
    }

    return res
      .cookie("senderToken", senderToken, {
        httpOnly: true,
        samesite: "none",
        maxAge: 2 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "send the message success",
        success: true,
        id,
        sms: createsnder?.sms,
      });
  } catch (error) {
    console.log("Error white getting  the login sender", error);
  }
};

import { bkg } from "../model/bkgSmsrecivedSchma.js";
import { sender } from "../model/sendSmeSchema.js";

export const sendsmsBk = async (req, res) => {
  try {
    const { sms } = req.body;

    const { id } = req.params;
    
    if (!id) return res.json({ message: "not user Id" });
    const sendeRFind = await sender.findOne({ _id: id });
    if (!sendeRFind) return res.json({ message: "sender not Found !" });
    sendeRFind?.bkgsms?.push(sms);
    await sendeRFind?.save();
    res.status(200).json({ message: "send sms success", success: true });
  } catch (error) {
    console.log("error while getting", error);
  }
};

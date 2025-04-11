import { project } from "../../model/projectModel/createprojectShema.js";
import nodemailer from "nodemailer";
import { config } from "dotenv";
config({ path: "./config/config.env" });
export const getproduct = async (req, res) => {
  try {
    const projectData = await project.find();
    if (!projectData)
      return res
        .status(404)
        .json({ message: "data not found porject", success: false });
    res.json({ messsage: "all data of project", success: true, projectData });
  } catch (error) {
    console.log("Error while getting the message get product", error);
  }
};

// -------- email sending logic ---

export const recievedSms = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL, // Your Gmail email address
        pass: process.env.MY_PASS, // Your Gmail app password
      },
    });

    const { userName, userEmail, message } = req.body;
    console.log(userName);
    const mailOptions = {
      from: userEmail,
      to: process.env.MY_EMAIL,
      subject: `Message from ${userName} <${userEmail}>`,
      text: `You received a message from ${userName} (${userEmail}):\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res
          .status(200)
          .json({ message: "Email sent successfully!", success: true });
      }
    });
  } catch (error) {
    console.log("error while sending sms of gmail");
  }
};

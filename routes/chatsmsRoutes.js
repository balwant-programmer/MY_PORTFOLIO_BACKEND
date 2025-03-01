import express from "express";
import { loginSender } from "../controller/LoginSender.js";
import { senderCheckLogin } from "../controller/senderChecklogin.js";
import { senderToken } from "../MiddleWare/senderToken.js";
import { sendSms } from "../controller/sendeSmsController.js";
import { recviedsms } from "../controller/reviednSms.js";
import { getSmsOftheSender } from "../controller/getsniglesnderSms.js";
import { sendsmsBk } from "../controller/sendSmsBk.js";

const router = express.Router();

router.route("/loginsender/:id").post(loginSender);
router.route("/checksender").post(senderToken, senderCheckLogin);
router.route("/sendsms").post(senderToken, sendSms);
router.route("/recived").get(recviedsms);
router.route("/getsms").get(senderToken, getSmsOftheSender);
router.route("/bksend/:id").post(sendsmsBk);

export default router;

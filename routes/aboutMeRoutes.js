import express from "express";
import { aboutImage, aboutMe } from "../controller/AboutControoller.js";
import { upload } from "../muter/multer.js";
const router = express.Router();
router.route("/about").post(upload.single("abouturl"), aboutMe);
router.route("/about/getimage").get(aboutImage);
export default router;

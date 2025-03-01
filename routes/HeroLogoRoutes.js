import express from "express";
import {
  downloadResume,
  getlogoImage,
  heroLogoSectionController,
  resumeUpload,
} from "../controller/HeroSectionLogoController.js";
import { upload } from "../muter/multer.js";

const router = express.Router();

router
  .route("/logo")
  .post(upload.single("herologo"), heroLogoSectionController);
router.route("/getLogo").get(getlogoImage);
router.route("/resume").post(resumeUpload);
router.route("/download").get(downloadResume);
export default router;

import express from "express";
import {
  downloadResume,
  getlogoImage,
  heroLogoSectionController,
  resumeUpload,
} from "../controller/HeroSectionLogoController.js";
import { upload } from "../muter/multer.js";
import { getVideo, video } from "../controller/VideoController.js";

const router = express.Router();

router
  .route("/logo")
  .post(upload.single("herologo"), heroLogoSectionController);
router.route("/getLogo").get(getlogoImage);
router.route("/resume").post(resumeUpload);
router.route("/download").get(downloadResume);
router.route("/postvideo").post(video);
router.route("/getvideo").get(getVideo);
export default router;

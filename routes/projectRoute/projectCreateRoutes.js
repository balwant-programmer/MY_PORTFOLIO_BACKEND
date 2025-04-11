import express from "express";
import { createProject } from "../../controller/project/CreateProjectController.js";
import { upload } from "../../muter/multer.js";
import {
  getproduct,
  recievedSms,
} from "../../controller/project/getprojectData.js";
import { projectDeleted } from "../../controller/project/projectDeletd.js";

const router = express.Router();

router.route("/createproject").post(upload.array("images", 2), createProject);
router.route("/getproject").get(getproduct);
router.route("/projectDelete/:id").delete(projectDeleted);
router.route("/sms").post(recievedSms);

export default router;

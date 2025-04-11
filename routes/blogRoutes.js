import express from "express";
import { adminBlog } from "../controller/BlogController.js";
import { TokeneLization } from "../MiddleWare/jsonwebToken.js";
import { upload } from "../muter/multer.js";
import { allBlog, blogDeleted } from "../controller/Allblogcontroller.js";
import { blogLike } from "../controller/blogLike.js";
import { verifyToken } from "../MiddleWare/variToekn.js";

const router = express.Router();

router.route("/blogpost").post(upload.single("codefile"), adminBlog);
router.route("/allblog").get(allBlog);
router.route("/bloglike").post(verifyToken, blogLike);
router.route("/blogdelete/:id").delete(blogDeleted);
export default router;

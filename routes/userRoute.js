import express from "express";
import { register } from "../controller/userController.js";
import { upload } from "../muter/multer.js";
import {
  login,
  logout,
  userUpadetCredatial,
} from "../controller/userLoginControoler.js";
import { user, UserImageUpadte } from "../controller/userFinde.js";
import { verifyToken } from "../MiddleWare/variToekn.js";

const router = express.Router();

router.route("/register").post(upload.single("logo"), register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/user").get(verifyToken, user);
router
  .route("/userImageUpadte")
  .patch(verifyToken, upload.single("upadate_logo"), UserImageUpadte);

router.route("/userUpdate/:id").put(userUpadetCredatial);

export default router;

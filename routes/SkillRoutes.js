import expresss from "express";
import { SkillUplaods } from "../controller/SkillControll.js";
import { SkillallData } from "../controller/SkillFetchData.js";
import { skilldelele } from "../controller/skilldelele.js";

const router = expresss.Router();

router.route("/mentionSkill").post(SkillUplaods);
router.route("/skillall").get(SkillallData);
router.route("/skilldelete/:id").delete(skilldelele);

export default router;

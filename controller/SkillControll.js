import { skill } from "../model/SkillSchme.js";

export const SkillUplaods = async (req, res) => {
  const { name, title, img } = req.body;
  try {
    if (!name || !title || !img) {
      return res.status(404).json({ message: "not found !", success: false });
    }

    const SkillExits = await skill.findOne({ name });

    if (SkillExits) {
      return res
        .status(404)
        .json({ message: "name already present", success: false });
    }

    const skillData = new skill({
      name,
      title,
      img,
    });

    await skillData.save();

    return res.status(200).json({ message: "upload success!", success: true });
  } catch (error) {
    console.log("Error while getting the skill upload", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

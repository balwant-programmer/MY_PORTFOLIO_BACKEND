import { skill } from "../model/SkillSchme.js";
export const SkillallData = async (req, res) => {
  try {
    const skillDat = await skill.find();

    if (!skillDat) {
      res.status(404).json({ message: "not found", success: false });
    }
    res.status(200).json({ skillDat, success: true });
  } catch (error) {
    console.log("Error white getting the skillall", error);
  }
};

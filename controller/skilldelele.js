import { skill } from "../model/SkillSchme.js";

export const skilldelele = async (req, res) => {
  try {
    // Extract the skill ID from the request parameters
    const { id } = req.params;

    // Ensure the ID is provided in the request
    if (!id) {
      return res.status(400).json({
        message: "ID is required to delete the skill.",
        success: false,
      });
    }

    // Perform the deletion operation
    const result = await skill.deleteOne({ _id: id });

    // Check if the skill was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Skill not found or already deleted.",
        success: false,
      });
    }

    // Respond with success
    return res.status(200).json({
      message: "Skill deleted successfully.",
      success: true,
    });
  } catch (error) {
    // Catch and log any errors that occur during the deletion process
    console.error("Error while deleting the skill:", error);
    return res.status(500).json({
      message: "Server error while deleting the skill.",
      success: false,
    });
    s;
  }
};

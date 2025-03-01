import { project } from "../../model/projectModel/createprojectShema.js";
export const projectDeleted = async (req, res) => {
  try {
    const { id } = req?.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "No ID provided to delete project!", success: false });
    }

    const deletedResponse = await project.deleteOne({ _id: id });

    if (deletedResponse.deletedCount === 0) {
      return res.status(404).json({
        message: "Project not found or already deleted",
        success: false,
      });
    }

    return res
      .status(200)
      .json({ message: "Project deleted successfully", success: true });
  } catch (error) {
    console.log("Error while deleting project:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

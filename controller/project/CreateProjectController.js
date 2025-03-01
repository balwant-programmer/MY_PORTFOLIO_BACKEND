import { json } from "node:stream/consumers";
import { cloudinaryUpload } from "../../Cloudinary/cloudinary.js";
import { project } from "../../model/projectModel/createprojectShema.js";
import path from 'node:path'

export const createProject = async (req, res) => {
  const { name, websiteLink, introduction } = req.body;
  let { Technology, deploy } = req.body;
  deploy = JSON.parse(deploy);
  Technology = JSON.parse(Technology);
  if (deploy.length === 0 || Technology.length === 0) {
    return res
      .status(404)
      .json({ message: "Tecnical skill and deployed probles", success: false });
  }
  try {
    const image1 = req.files[0];
    const image2 = req.files[1];
    if(!image1 || !image2){
      return res.status(404).json({message:"Image not Found !" , success:false})
    }

    if (
      [name, websiteLink, introduction].some(
        (check) => !check || check.trim() === ""
      )
    ) {
      res.json({ message: "All Filed Required !", success: false });
    }
   
   const filename1 = crypto?.randomUUID() + path?.extname(image1?.originalname);
   const filename2 = crypto?.randomUUID() + path?.extname(image2?.originalname);
   
    const urlimageurl1 = await cloudinaryUpload(image1.buffer , filename1);
    const imageUlr2 = await cloudinaryUpload(image2?.buffer , filename2);

    if (!urlimageurl1 || !imageUlr2)
      return res
        .status(404)
        .json({ message: "not found image", success: false });

    const creatProject = new project({
      name,
      Technology,
      deploy,
      websiteLink,
      images: [urlimageurl1, imageUlr2],
      introduction,
    });
    await creatProject.save();
    return res.status(200).json({
      message: "project upolaoed !",
      success: true,
    });
  } catch (error) {
    console.log("error in Create project", error);
  }
};

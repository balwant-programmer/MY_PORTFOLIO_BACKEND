import { json } from "express";
import { cloudinaryUpload } from "../Cloudinary/cloudinary.js";
import { herosectionLogo } from "../model/HeroSectionLogoSchema.js";
import { resumeModel } from "../model/resumeShema.js";
import fs, { readFileSync } from "fs";

import path from "path";
import axios from "axios";
export const heroLogoSectionController = async (req, res) => {
  const file = req?.file;

  try {
    if (!file)
      res.status(404).json({ message: "not found logo image", success: false });
    const filename = crypto?.randomUUID() + path?.extname(req?.file?.originalname);
    const logoUrl = await cloudinaryUpload(file?.buffer ,filename);
    if (!logoUrl)
      return res
        .status(404)
        .json({ message: "Cloudinry logo url not Found", success: false });

    const userData = await herosectionLogo.findOne({});
    if (userData) {
      const data = await herosectionLogo.updateOne(
        { _id: userData._id },
        {
          $set: { herologo: logoUrl },
        }
      );
      if (data?.modifiedCount === 1) {
        return res
          ?.status(200)
          ?.json({ message: "logo upadated success", success: true });
      }
    } else {
      const createLogo = new herosectionLogo({
        herologo: logoUrl,
      });
      await createLogo.save();

      return res
        ?.status(200)
        ?.json({ message: "Create logo success", success: true });
    }
  } catch (error) {
    console.log("error while getting the hero logo section", error);
  }
};

export const getlogoImage = async (req, res) => {
  try {
    const herologo = await herosectionLogo?.findOne();
    if (!herologo)
      return res
        .status(404)
        .json({ message: "not found image", success: false });

    return res.json({
      message: "logo fetch successs",
      heroLogo: herologo?.herologo,
      success: true,
    });
  } catch (error) {
    console.log("error while getting the getlogoImage", error);
  }
};

// -------resume uplaoded ..

export const resumeUpload = async (req, res) => {
  const { file } = req?.body;
  if (!file) {
    return res.status(404).json({ message: "No file found", success: false });
  }

  try {
    const userData = await resumeModel.findOne({});
    if (userData) {
      const data = await resumeModel.updateOne(
        { _id: userData._id },
        { $set: { resume: file } }
      );

      if (data?.modifiedCount === 1) {
        return res
          .status(200)
          .json({ message: "Resume updated successfully", success: true });
      } else {
        return res
          .status(500)
          .json({ message: "Failed to update resume", success: false });
      }
    } else {
      const createResume = new resumeModel({
        resume: file,
      });
      await createResume.save();

      return res
        .status(200)
        .json({ message: "Resume uploaded successfully", success: true });
    }
  } catch (error) {
    console.error("Error while uploading resume:", error);
    return res
      .status(500)
      .json({ message: "Server error while uploading resume", success: false });
  }
};

//------downLoading...
export const downloadResume = async (req, res) => {
  try {
    const userData = await resumeModel.findOne({});

    if (!userData || !userData.resume) {
      return res
        .status(404)
        .json({ message: "Resume not found", success: false });
    }

    // Perform the 302 redirect with the correct syntax
    res.status(200).json( {message:"success fetch url of resume" ,success:true,urlResume:userData?.resume});
  } catch (error) {
    console.error("Error while downloading resume:", error);
    res.status(500).json({
      message: "Server error while downloading resume",
      success: false,
    });
  }
};

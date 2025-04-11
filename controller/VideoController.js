import videoModel from "../model/videShema.js";
export const video = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) {
      return res
        .status(404)
        .json({ message: "video url not Found !", success: false });
    }
    const exitVideo = await videoModel.findOne();
    if (exitVideo) {
      const find = await videoModel.findOne({ _id: exitVideo._id });
      find.video = videoUrl;
      await find.save();
      return res
        .status(200)
        .json({ message: "video update Success !", success: true });
    } else {
      const videoSave = new videoModel({
        video: videoUrl,
      });
      videoSave.save();
      return res
        .status(200)
        .json({ message: "vidoe uplaoded Success !", success: true });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server Error !", succees: false });
  }
};

// get video -------
export const getVideo = async (req, res) => {
  try {
    const videoUrl = await videoModel.findOne();
    if (!videoUrl) {
      return res
        .status(404)
        .json({ message: "VIdeo not Found !", success: false });
    } else {
      return res
        .status(200)
        .json({ message: "Video Fetch success", success: true, videoUrl });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server Error !", succees: false });
  }
};

import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import streamifier from "streamifier";  // You missed this import
config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudinaryUpload = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "logo",  
        resource_type: "auto",  
        public_id: filename,  
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject("Error uploading to Cloudinary: " + error.message);  
        } else {
          console.log("Uploaded to Cloudinary:", result);
          resolve(result.secure_url);  
        }
      }
    );

    
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

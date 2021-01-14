require("dotenv").config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMapImage = (file: any): Promise<any> => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, { folder: "maps", use_filename: true, unique_filename: false }).then((result) => {
      return resolve({
        url: result.secure_url,
        id: result.public_id,
      });
    });
  });
};


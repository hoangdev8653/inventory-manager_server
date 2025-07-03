import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dtcvzzsvv",
  api_key: process.env.CLOUDINARY_KEY || "358466391411872",
  api_secret: process.env.CLOUDINARY_SECRET || "tNGFcI_xnkrrc1lupRvFv8ZxHKw",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "smartCV",
      resource_type: "auto",
      allowedFormats: ["jpeg", "png", "jpg", "mp3", "webp"],
    };
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;

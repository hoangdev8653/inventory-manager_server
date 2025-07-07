import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dtcvzzsvv",
  api_key: process.env.CLOUDINARY_KEY || "487759921972656",
  api_secret: process.env.CLOUDINARY_SECRET || "E5qn6zq8-W0D80lcwh4M58VmQvY",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "inventory-manager",
      resource_type: "auto",
      allowedFormats: ["jpeg", "png", "jpg", "mp3", "webp"],
    };
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;

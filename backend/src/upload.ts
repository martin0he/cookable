import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: `cookbooks`,
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`,
      resource_type: "image",
    };
  },
});

const upload = multer({ storage });

export default upload;

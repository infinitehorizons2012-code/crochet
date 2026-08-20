import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME || 'zopjocdi',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function uploadColorMrWay4() {
  const filePath = 'C:/Users/DT.HANG/Downloads/FSave.com_Reels_Cach-doi-mau-len-thang-hang-neee_Media_999129066445077_001_1080p.mp4';
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  console.log("Uploading Color MR Way 4 to Cloudinary...");
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'color_mr_way4',
    overwrite: true
  });

  console.log("Uploaded Color MR Way 4 URL:", res.secure_url);
  fs.writeFileSync('scratch/color_mr_way4_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadColorMrWay4();

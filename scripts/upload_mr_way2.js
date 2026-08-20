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

async function uploadMrWay2() {
  const filePath = 'C:/Users/DT.HANG/Downloads/snapsave.vn_facebook_6a8663d1a47e0.mp4';
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  console.log("Uploading snapsave.vn_facebook_6a8663d1a47e0.mp4 to Cloudinary...");
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'mr_way2',
    overwrite: true
  });

  console.log("Uploaded Magic Ring Way 2 URL:", res.secure_url);
  fs.writeFileSync('scratch/mr_way2_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadMrWay2();

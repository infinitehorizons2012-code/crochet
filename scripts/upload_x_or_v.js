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

async function uploadXorV() {
  const filePath = 'C:/Users/DT.HANG/Downloads/snapsave.vn_facebook_6a8662637f7f3.mp4';
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  console.log("Uploading snapsave.vn_facebook_6a8662637f7f3.mp4 to Cloudinary...");
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'x_or_v_mr',
    overwrite: true
  });

  console.log("Uploaded X or V MR URL:", res.secure_url);
  fs.writeFileSync('scratch/x_or_v_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadXorV();

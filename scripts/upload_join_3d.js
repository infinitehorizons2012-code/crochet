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

async function uploadJoin3d() {
  const filePath = 'C:/Users/DT.HANG/Downloads/join 4.mp4';
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  console.log("Uploading join 4.mp4 to Cloudinary...");
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'join_3d_pieces',
    overwrite: true
  });

  console.log("Uploaded Join 3D Pieces URL:", res.secure_url);
  fs.writeFileSync('scratch/join_3d_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadJoin3d();

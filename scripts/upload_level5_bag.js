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

async function uploadLevel5Bag() {
  const filePath = "C:\\Users\\DT.HANG\\Downloads\\túi.mp4";
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  const stats = fs.statSync(filePath);
  console.log(`Uploading Level 5 Bag video (${(stats.size/1024/1024).toFixed(2)} MB) to Cloudinary...`);
  
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level5_bag',
    public_id: 'level5_bag_theory',
    overwrite: true
  });

  console.log("Uploaded Level 5 Bag URL:", res.secure_url);
  fs.writeFileSync('scratch/level5_bag_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadLevel5Bag();

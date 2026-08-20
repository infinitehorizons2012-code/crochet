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

async function uploadJoinMrVideo2() {
  const filePath = "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_When-working-in-joining-rounds-not-conti_Media_971054529321486_001_1080p.mp4";
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  const stats = fs.statSync(filePath);
  console.log(`Uploading Join MR Video 2 (${(stats.size/1024/1024).toFixed(2)} MB) to Cloudinary...`);
  
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'join_mr_tip_4_joining_rounds',
    overwrite: true
  });

  console.log("Uploaded Join MR Video 2 URL:", res.secure_url);
  fs.writeFileSync('scratch/join_mr_video2_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadJoinMrVideo2();

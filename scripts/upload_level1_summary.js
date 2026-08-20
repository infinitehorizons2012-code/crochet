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

async function uploadLevel1Summary() {
  const filePath = 'C:/Users/DT.HANG/Downloads/FSave.com_Reels_Chart-hinh-khong-kho-lam-nhu-video-la-du_Media_4484952718452406_001_720p.mp4';
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  console.log("Uploading Level 1 Summary Video to Cloudinary...");
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level1',
    public_id: 'level1_summary_video',
    overwrite: true
  });

  console.log("Uploaded Level 1 Summary Video URL:", res.secure_url);
  fs.writeFileSync('scratch/level1_summary_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadLevel1Summary();

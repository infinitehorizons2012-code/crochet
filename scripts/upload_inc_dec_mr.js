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

async function uploadIncDecMr() {
  const filePath = "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_Here-s-a-visual-showing-how-stacking-you_Media_1727475475164328_001_1080p.mp4";
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  const stats = fs.statSync(filePath);
  console.log(`Uploading Inc Dec MR video (${(stats.size/1024/1024).toFixed(2)} MB) to Cloudinary...`);
  
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'inc_dec_mr',
    overwrite: true
  });

  console.log("Uploaded Inc Dec MR URL:", res.secure_url);
  fs.writeFileSync('scratch/inc_dec_mr_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadIncDecMr();

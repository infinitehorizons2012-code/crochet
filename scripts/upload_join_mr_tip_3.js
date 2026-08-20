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

async function uploadJoinMrTip3() {
  const filePath = 'C:/Users/DT.HANG/Downloads/FSave.com_Reels_Cach-ket-hang-khong-lo-ne_Media_1997714884142182_001_720p.mp4';
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  console.log("Uploading Join MR Tip 3 to Cloudinary...");
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'join_mr_tip_3',
    overwrite: true
  });

  console.log("Uploaded Join MR Tip 3 URL:", res.secure_url);
  fs.writeFileSync('scratch/join_mr_tip_3_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadJoinMrTip3();

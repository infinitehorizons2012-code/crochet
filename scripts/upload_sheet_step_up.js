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

async function uploadSheetStepUp() {
  const filePath = 'scratch/sheet_step_up_compressed.mp4';
  if (!fs.existsSync(filePath)) {
    console.error("File NOT found:", filePath);
    return;
  }

  const stats = fs.statSync(filePath);
  console.log(`Uploading compressed Sheet Step Up video (${(stats.size/1024/1024).toFixed(2)} MB) to Cloudinary...`);
  
  const res = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2_sheet',
    public_id: 'sheet_step_up',
    overwrite: true
  });

  console.log("Uploaded Sheet Step Up URL:", res.secure_url);
  fs.writeFileSync('scratch/sheet_step_up_url.json', JSON.stringify({ url: res.secure_url }, null, 2), 'utf8');
}

uploadSheetStepUp();

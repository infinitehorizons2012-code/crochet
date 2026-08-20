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

async function uploadJoinMrTips() {
  const file1 = 'C:/Users/DT.HANG/Downloads/FSave.com_Reels_Tip-ket-hang-khong-lo-den-dayyy_Media_1098670245929106_001_720p.mp4';
  const file2 = 'C:/Users/DT.HANG/Downloads/FSave.com_Reels_Cach-ket-hang-khong-ho-nay-moi-nguoi-da-_Media_1471223271360108_001_720p.mp4';

  console.log("Uploading Join MR Tip 1 to Cloudinary...");
  const res1 = await cloudinary.uploader.upload(file1, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'join_mr_tip_1',
    overwrite: true
  });
  console.log("Uploaded Join MR Tip 1 URL:", res1.secure_url);

  console.log("Uploading Join MR Tip 2 to Cloudinary...");
  const res2 = await cloudinary.uploader.upload(file2, {
    resource_type: 'video',
    folder: 'crochet_kids_symbols_level2',
    public_id: 'join_mr_tip_2',
    overwrite: true
  });
  console.log("Uploaded Join MR Tip 2 URL:", res2.secure_url);

  fs.writeFileSync('scratch/join_mr_tips_urls.json', JSON.stringify({
    url1: res1.secure_url,
    url2: res2.secure_url
  }, null, 2), 'utf8');
}

uploadJoinMrTips();

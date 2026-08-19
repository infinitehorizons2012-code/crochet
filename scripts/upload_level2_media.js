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

async function uploadLevel2Media() {
  const mrPath = 'C:/Users/DT.HANG/Downloads/Crochet/video basic/Magic ring.mp4';
  const joinPath = 'C:/Users/DT.HANG/Downloads/join 1.mp4';

  let mrUrl = '';
  let joinUrl = '';

  if (fs.existsSync(mrPath)) {
    console.log("Uploading Magic ring.mp4 to Cloudinary...");
    const resMr = await cloudinary.uploader.upload(mrPath, {
      resource_type: 'video',
      folder: 'crochet_kids_symbols_level2',
      public_id: 'mr_magic_ring'
    });
    mrUrl = resMr.secure_url;
    console.log("MR URL:", mrUrl);
  }

  if (fs.existsSync(joinPath)) {
    console.log("Uploading join 1.mp4 to Cloudinary...");
    const resJoin = await cloudinary.uploader.upload(joinPath, {
      resource_type: 'video',
      folder: 'crochet_kids_symbols_level2',
      public_id: 'join_mr_joining'
    });
    joinUrl = resJoin.secure_url;
    console.log("JOIN MR URL:", joinUrl);
  }

  const result = { mrUrl, joinUrl };
  fs.writeFileSync('scratch/level2_urls.json', JSON.stringify(result, null, 2), 'utf8');
}

uploadLevel2Media();

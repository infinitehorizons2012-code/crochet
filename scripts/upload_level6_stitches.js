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

const folderPath = "C:\\Users\\DT.HANG\\Downloads\\New folder (2)";

const stitchesToUpload = [
  { fileName: "Bobble.mp4", publicId: "stitch_bobble" },
  { fileName: "loop.mp4", publicId: "stitch_loop" },
  { fileName: "Popcorn.mp4", publicId: "stitch_popcorn" },
  { fileName: "Puff.mp4", publicId: "stitch_puff" }
];

async function uploadLevel6Stitches() {
  const results = {};
  for (let i = 0; i < stitchesToUpload.length; i++) {
    const item = stitchesToUpload[i];
    const fullPath = path.join(folderPath, item.fileName);
    if (!fs.existsSync(fullPath)) {
      console.error(`File NOT found: ${fullPath}`);
      continue;
    }

    const stats = fs.statSync(fullPath);
    console.log(`Uploading [${i+1}/${stitchesToUpload.length}] ${item.publicId} (${(stats.size/1024/1024).toFixed(2)} MB) to Cloudinary...`);
    
    try {
      const res = await cloudinary.uploader.upload(fullPath, {
        resource_type: 'video',
        folder: 'crochet_kids_symbols_level6_stitches',
        public_id: item.publicId,
        overwrite: true
      });
      results[item.publicId] = res.secure_url;
      console.log(`Uploaded #${i+1} (${item.publicId}): ${res.secure_url}`);
    } catch (err) {
      console.error(`Error uploading #${i+1} (${item.publicId}):`, err.message || err);
    }
  }

  fs.writeFileSync('scratch/level6_stitches_urls.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved scratch/level6_stitches_urls.json with', Object.keys(results).length, 'URLs.');
}

uploadLevel6Stitches();

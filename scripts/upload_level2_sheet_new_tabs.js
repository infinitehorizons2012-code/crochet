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

const filesToUpload = [
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_If-you-want-the-bottom-edge-of-your-work_Media_4104053316558779_001_1080p.mp4",
    publicId: 'sheet_row2'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\snapsave.vn_facebook_6a8665ddb5429.mp4",
    publicId: 'sheet_bottom_loop'
  }
];

async function uploadSheetNewTabs() {
  const results = {};
  for (let i = 0; i < filesToUpload.length; i++) {
    const item = filesToUpload[i];
    console.log(`Uploading [${i+1}/${filesToUpload.length}] ${item.publicId} (${path.basename(item.localPath)}) to Cloudinary...`);
    try {
      const res = await cloudinary.uploader.upload(item.localPath, {
        resource_type: 'video',
        folder: 'crochet_kids_symbols_level2_sheet',
        public_id: item.publicId,
        overwrite: true
      });
      results[item.publicId] = res.secure_url;
      console.log(`Uploaded #${i+1} (${item.publicId}): ${res.secure_url}`);
    } catch (err) {
      console.error(`Error uploading #${i+1} (${item.publicId}):`, err.message || err);
    }
  }

  fs.writeFileSync('scratch/level2_sheet_new_urls.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved scratch/level2_sheet_new_urls.json with', Object.keys(results).length, 'URLs.');
}

uploadSheetNewTabs();

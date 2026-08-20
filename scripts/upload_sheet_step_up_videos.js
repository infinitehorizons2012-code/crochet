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
    localPath: "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_When-working-with-single-crochet-stitche_Media_3365679350405424_001_1080p.mp4",
    publicId: 'sheet_step_up_video2'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_Last-week-I-posted-a-video-showing-how-t_Media_2316862025795959_001_1080p.mp4",
    publicId: 'sheet_step_up_video3'
  }
];

async function uploadSheetStepUpVideos() {
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

  fs.writeFileSync('scratch/sheet_step_up_new_urls.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved scratch/sheet_step_up_new_urls.json with', Object.keys(results).length, 'URLs.');
}

uploadSheetStepUpVideos();

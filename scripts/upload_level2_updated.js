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

async function uploadUpdatedLevel2Media() {
  const uploads = [
    {
      key: 'mrUrl',
      localPath: 'C:/Users/DT.HANG/Downloads/Crochet/video basic/Magic ring.mp4',
      publicId: 'mr_magic_ring'
    },
    {
      key: 'joinMrUrl',
      localPath: 'C:/Users/DT.HANG/Downloads/change color 3.mp4',
      publicId: 'join_mr_change_color_3'
    },
    {
      key: 'colorMrUrl',
      localPath: 'C:/Users/DT.HANG/Downloads/change color 2.mp4',
      publicId: 'color_mr_change_color_2'
    },
    {
      key: 'connect2mrPart1Url',
      localPath: 'C:/Users/DT.HANG/Downloads/join 1.mp4',
      publicId: 'connect_2mr_join_1'
    },
    {
      key: 'connect2mrPart2Url',
      localPath: 'C:/Users/DT.HANG/Downloads/join 2.mp4',
      publicId: 'connect_2mr_join_2'
    }
  ];

  const results = {};

  for (const item of uploads) {
    if (fs.existsSync(item.localPath)) {
      console.log(`Uploading ${item.localPath} to Cloudinary public_id: ${item.publicId}...`);
      const res = await cloudinary.uploader.upload(item.localPath, {
        resource_type: 'video',
        folder: 'crochet_kids_symbols_level2',
        public_id: item.publicId,
        overwrite: true
      });
      results[item.key] = res.secure_url;
      console.log(`Uploaded ${item.key}: ${res.secure_url}`);
    } else {
      console.error(`File NOT found: ${item.localPath}`);
    }
  }

  fs.writeFileSync('scratch/level2_updated_urls.json', JSON.stringify(results, null, 2), 'utf8');
  console.log("Saved URLs to scratch/level2_updated_urls.json");
}

uploadUpdatedLevel2Media();

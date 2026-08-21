import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME || 'zopjocdi',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function listVideos() {
  try {
    const res = await cloudinary.api.resources({
      resource_type: 'video',
      max_results: 500
    });
    console.log('ALL CLOUDINARY VIDEOS IN ACCOUNT (Total: ' + res.resources.length + '):');
    res.resources.forEach(r => {
      console.log(`- PublicID: ${r.public_id} | Format: ${r.format} | URL: ${r.secure_url}`);
    });
  } catch (err) {
    console.error('Error listing Cloudinary resources:', err.message);
  }
}

listVideos();

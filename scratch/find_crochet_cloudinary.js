import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME || 'zopjocdi',
  api_key: process.env.CLOUDINARY_API_KEY || '139281895998719',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'BD21g_T42BaJdVvVw6MjbBZh1Z0',
  secure: true
});

async function checkAllProjects() {
  try {
    const res = await cloudinary.api.resources({
      resource_type: 'video',
      type: 'upload',
      prefix: 'crochet_kids_projects',
      max_results: 500
    });
    console.log('ALL PROJECTS IN CLOUDINARY:', res.resources.map(r => r.public_id));
  } catch (err) {
    console.error('Error:', err);
  }
}

checkAllProjects();

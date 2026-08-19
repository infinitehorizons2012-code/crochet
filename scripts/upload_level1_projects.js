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

async function uploadProjects() {
  const dir = 'C:/Users/DT.HANG/Downloads/Project level 1';
  if (!fs.existsSync(dir)) {
    console.error("Directory not found:", dir);
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));
  console.log("Found Level 1 project videos:", files);

  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir, file);
    console.log(`Uploading [${i + 1}/${files.length}] ${file}...`);

    try {
      const res = await cloudinary.uploader.upload(filePath, {
        resource_type: 'video',
        folder: 'crochet_kids_projects_level1',
        public_id: `level1_project_${i + 1}`
      });

      console.log(`Project ${i + 1} Cloudinary URL:`, res.secure_url);

      results.push({
        id: `proj_l1_${i + 1}`,
        title: `Dự Án Thực Hành Level 1 #${i + 1}`,
        videoUrl: res.secure_url,
        fileName: file
      });
    } catch (err) {
      console.error(`Error uploading ${file}:`, err);
    }
  }

  const outputPath = path.join(process.cwd(), 'src', 'data', 'level1Projects.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log("Wrote Level 1 projects metadata to src/data/level1Projects.json!");
}

uploadProjects();

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

async function uploadNewLevel1Projects() {
  const dir = 'C:/Users/DT.HANG/Downloads/New folder (2)';
  const files = [
    'snapsave.vn_facebook_6a8660504740e.mp4',
    'snapsave.vn_facebook_6a8660be82225.mp4',
    'snapsave.vn_facebook_6a8660e2ef4d7.mp4',
    'snapsave.vn_facebook_6a866165c75aa.mp4',
    'snapsave.vn_facebook_6a86619deffa5.mp4',
    'snapsave.vn_facebook_6a8661c17a289.mp4',
    'snapsave.vn_facebook_6a8661dc46c4a.mp4'
  ];

  const uploadedProjects = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const filePath = path.join(dir, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`Uploading [${i + 1}/7] ${fileName} to Cloudinary...`);
      const res = await cloudinary.uploader.upload(filePath, {
        resource_type: 'video',
        folder: 'crochet_kids_projects_level1',
        public_id: `level1_new_project_${i + 1}`,
        overwrite: true
      });
      console.log(`Uploaded #${i + 1}: ${res.secure_url}`);
      uploadedProjects.push({
        id: `proj_l1_new_${i + 1}`,
        title: `Dự Án Mẫu Móc Level 1 #${i + 1}`,
        videoUrl: res.secure_url,
        fileName: fileName
      });
    } else {
      console.error(`File NOT found: ${filePath}`);
    }
  }

  // Load existing level1Projects.json
  const jsonPath = 'src/data/level1Projects.json';
  let oldProjects = [];
  if (fs.existsSync(jsonPath)) {
    oldProjects = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }

  // Prepend new projects before old projects as requested by user!
  const combined = [...uploadedProjects, ...oldProjects];

  fs.writeFileSync(jsonPath, JSON.stringify(combined, null, 2), 'utf8');
  console.log(`Updated ${jsonPath} with ${combined.length} total projects (${uploadedProjects.length} new + ${oldProjects.length} old).`);
}

uploadNewLevel1Projects();

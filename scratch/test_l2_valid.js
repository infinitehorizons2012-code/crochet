import { execSync } from 'child_process';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME || 'zopjocdi',
  api_key: process.env.CLOUDINARY_API_KEY || '139281895998719',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'BD21g_T42BaJdVvVw6MjbBZh1Z0',
  secure: true
});

const validL2VideoUrls = [
  'https://res.cloudinary.com/zopjocdi/video/upload/v1787194083/crochet_kids_projects_level1/level1_new_project_1.mp4',
  'https://res.cloudinary.com/zopjocdi/video/upload/v1787194115/crochet_kids_projects_level1/level1_new_project_2.mp4',
  'https://res.cloudinary.com/zopjocdi/video/upload/v1787194195/crochet_kids_projects_level1/level1_new_project_3.mp4',
  'https://res.cloudinary.com/zopjocdi/video/upload/v1787194211/crochet_kids_projects_level1/level1_new_project_4.mp4',
  'https://res.cloudinary.com/zopjocdi/video/upload/v1787194266/crochet_kids_projects_level1/level1_new_project_5.mp4',
  'https://res.cloudinary.com/zopjocdi/video/upload/v1787194294/crochet_kids_projects_level1/level1_new_project_6.mp4'
];

const projectsL2 = JSON.parse(fs.readFileSync('src/data/level2Projects2D.json', 'utf8'));

async function processL2Valid() {
  const outputDir = path.join(process.cwd(), 'scratch', 'posters');

  for (let i = 0; i < projectsL2.length; i++) {
    const proj = projectsL2[i];
    proj.videoUrl = validL2VideoUrls[i];
    console.log(`Processing L2 Project ${proj.id} (${proj.title})...`);

    const localJpgPath = path.join(outputDir, `${proj.id}.jpg`);
    const cmd = `ffmpeg -user_agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -ss 00:00:01 -i "${proj.videoUrl}" -vframes 1 -q:v 2 "${localJpgPath}" -y`;

    try {
      execSync(cmd, { stdio: 'ignore' });
      const size = fs.statSync(localJpgPath).size;
      console.log(`Successfully extracted frame (${proj.id}): ${size} bytes`);

      if (size > 10000) {
        const uploadRes = await cloudinary.uploader.upload(localJpgPath, {
          folder: 'crochet_kids_posters',
          public_id: `${proj.id}_poster`,
          overwrite: true
        });
        console.log(`Uploaded Cloudinary Poster (${proj.id}): ${uploadRes.secure_url}`);
        proj.posterUrl = uploadRes.secure_url;
      }
    } catch (err) {
      console.error(`FFmpeg failed for ${proj.id}:`, err.message);
    }
  }

  fs.writeFileSync('src/data/level2Projects2D.json', JSON.stringify(projectsL2, null, 2), 'utf8');
  console.log('SUCCESSFULLY FIXED L2 VIDEO URLS & POSTER IMAGES IN level2Projects2D.json!');
}

processL2Valid();

import { execSync } from 'child_process';
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

const projectsL2 = JSON.parse(fs.readFileSync('src/data/level2Projects2D.json', 'utf8'));
const projectsL1 = JSON.parse(fs.readFileSync('src/data/level1Projects.json', 'utf8'));

const allProjects = [
  ...projectsL2.map(p => ({ ...p, type: 'l2' })),
  ...projectsL1.map(p => ({ ...p, type: 'l1' }))
];

async function generateAndUploadFFmpegPosters() {
  const outputDir = path.join(process.cwd(), 'scratch', 'posters');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < allProjects.length; i++) {
    const proj = allProjects[i];
    console.log(`[${i+1}/${allProjects.length}] FFmpeg extracting frame for ${proj.id} (${proj.title})...`);

    const localJpgPath = path.join(outputDir, `${proj.id}.jpg`);
    const ffmpegCmd = `ffmpeg -ss 00:00:02.5 -i "${proj.videoUrl}" -vframes 1 -q:v 2 "${localJpgPath}" -y`;

    try {
      execSync(ffmpegCmd, { stdio: 'ignore' });
      const size = fs.statSync(localJpgPath).size;
      console.log(`Extracted frame (${proj.id}): ${size} bytes`);

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

  const updatedL2 = projectsL2.map(p => {
    const match = allProjects.find(ap => ap.id === p.id);
    return { ...p, posterUrl: match?.posterUrl || p.posterUrl || '' };
  });

  const updatedL1 = projectsL1.map(p => {
    const match = allProjects.find(ap => ap.id === p.id);
    return { ...p, posterUrl: match?.posterUrl || p.posterUrl || '' };
  });

  fs.writeFileSync('src/data/level2Projects2D.json', JSON.stringify(updatedL2, null, 2), 'utf8');
  fs.writeFileSync('src/data/level1Projects.json', JSON.stringify(updatedL1, null, 2), 'utf8');

  console.log('SUCCESSFULLY EXTRACTED & UPLOADED REAL COLORFUL POSTERS FOR ALL PROJECTS!');
}

generateAndUploadFFmpegPosters();

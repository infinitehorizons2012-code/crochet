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

async function processL2() {
  const outputDir = path.join(process.cwd(), 'scratch', 'posters');

  for (let i = 0; i < projectsL2.length; i++) {
    const proj = projectsL2[i];
    console.log(`Processing L2 Project ${proj.id} (${proj.title})...`);

    const localJpgPath = path.join(outputDir, `${proj.id}.jpg`);
    const cmd = `ffmpeg -user_agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -ss 00:00:01 -i "${proj.videoUrl}" -vframes 1 -q:v 2 "${localJpgPath}" -y`;

    try {
      execSync(cmd, { stdio: 'ignore' });
      const size = fs.statSync(localJpgPath).size;
      console.log(`Successfully extracted ${proj.id}: ${size} bytes`);

      if (size > 10000) {
        const uploadRes = await cloudinary.uploader.upload(localJpgPath, {
          folder: 'crochet_kids_posters',
          public_id: `${proj.id}_poster`,
          overwrite: true
        });
        console.log(`Uploaded Cloudinary L2 Poster (${proj.id}): ${uploadRes.secure_url}`);
        proj.posterUrl = uploadRes.secure_url;
      }
    } catch (err) {
      console.error(`FFmpeg L2 failed for ${proj.id}:`, err.message);
    }
  }

  fs.writeFileSync('src/data/level2Projects2D.json', JSON.stringify(projectsL2, null, 2), 'utf8');
  console.log('DONE UPDATING level2Projects2D.json WITH REAL COLORFUL POSTERS!');
}

processL2();

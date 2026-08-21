import { chromium } from 'playwright';
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

async function generateAndUploadPosters() {
  const outputDir = path.join(process.cwd(), 'scratch', 'posters');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  for (let i = 0; i < allProjects.length; i++) {
    const proj = allProjects[i];
    console.log(`[${i+1}/${allProjects.length}] Processing poster for ${proj.id} (${proj.title})...`);

    const page = await browser.newPage();
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0; background:#000;">
        <video id="v" src="${proj.videoUrl}" crossorigin="anonymous" playsinline muted style="width:640px; height:640px; object-fit:cover;"></video>
        <canvas id="c" width="640" height="640"></canvas>
      </body>
      </html>
    `;

    await page.setContent(html);

    // Seek video to 1.5 seconds and draw to canvas
    const dataUrl = await page.evaluate(async () => {
      const v = document.getElementById('v');
      const c = document.getElementById('c');
      const ctx = c.getContext('2d');

      return new Promise((resolve, reject) => {
        v.onloadedmetadata = () => {
          v.currentTime = Math.min(1.5, (v.duration || 2) / 2);
        };
        v.onseeked = () => {
          ctx.drawImage(v, 0, 0, 640, 640);
          resolve(c.toDataURL('image/jpeg', 0.85));
        };
        v.onerror = (e) => reject(e);
        // Fallback timeout in case seek fails
        setTimeout(() => {
          ctx.drawImage(v, 0, 0, 640, 640);
          resolve(c.toDataURL('image/jpeg', 0.85));
        }, 4000);
      });
    }).catch(err => console.error('Evaluate error:', err.message));

    await page.close();

    if (dataUrl && dataUrl.startsWith('data:image/jpeg')) {
      const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
      const localJpgPath = path.join(outputDir, `${proj.id}.jpg`);
      fs.writeFileSync(localJpgPath, base64Data, 'base64');
      console.log(`Saved local poster: ${localJpgPath}`);

      // Upload to Cloudinary
      try {
        const uploadRes = await cloudinary.uploader.upload(localJpgPath, {
          folder: 'crochet_kids_posters',
          public_id: `${proj.id}_poster`,
          overwrite: true
        });
        console.log(`Uploaded Cloudinary Poster (${proj.id}): ${uploadRes.secure_url}`);
        proj.posterUrl = uploadRes.secure_url;
      } catch (uploadErr) {
        console.error(`Cloudinary upload failed for ${proj.id}:`, uploadErr.message);
      }
    }
  }

  await browser.close();

  // Save back updated project JSON files
  const updatedL2 = projectsL2.map(p => {
    const match = allProjects.find(ap => ap.id === p.id);
    return { ...p, posterUrl: match?.posterUrl || '' };
  });

  const updatedL1 = projectsL1.map(p => {
    const match = allProjects.find(ap => ap.id === p.id);
    return { ...p, posterUrl: match?.posterUrl || '' };
  });

  fs.writeFileSync('src/data/level2Projects2D.json', JSON.stringify(updatedL2, null, 2), 'utf8');
  fs.writeFileSync('src/data/level1Projects.json', JSON.stringify(updatedL1, null, 2), 'utf8');

  console.log('Successfully updated level2Projects2D.json & level1Projects.json with posterUrls!');
}

generateAndUploadPosters();

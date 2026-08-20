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

async function uploadLevel2Projects2D() {
  const dir = 'C:/Users/DT.HANG/Downloads/New folder (2)';
  const files = [
    {
      fileName: 'FSave.com_Reels_Huong-dan-moc-co-4-la-may-man-cho-may-co_Media_1506571827892028_001_1080p.mp4',
      title: 'Dự Án 2D #1: Cỏ 4 Lá May Mắn 🍀',
      emoji: '🍀'
    },
    {
      fileName: 'FSave.com_Reels_Nang-nao-khong-biet-moc-hoa-thi-boi-het-_Media_1780991406258514_001_720p.mp4',
      title: 'Dự Án 2D #2: Móc Hoa Xinh Xắn 🌸',
      emoji: '🌸'
    },
    {
      fileName: 'snapsave.vn_facebook_6a866b08cbfc9.mp4',
      title: 'Dự Án 2D #3: Mẫu Móc 2D Táo Đỏ 🍎',
      emoji: '🍎'
    },
    {
      fileName: 'snapsave.vn_facebook_6a866ba065dfa.mp4',
      title: 'Dự Án 2D #4: Mẫu Móc 2D Trái Tim 💖',
      emoji: '💖'
    },
    {
      fileName: 'snapsave.vn_facebook_6a866bc2586fc.mp4',
      title: 'Dự Án 2D #5: Mẫu Móc 2D Ngôi Sao ⭐',
      emoji: '⭐'
    },
    {
      fileName: 'snapsave.vn_facebook_6a866c3d4c9cf.mp4',
      title: 'Dự Án 2D #6: Mẫu Móc 2D Búp Măng 🍓',
      emoji: '🍓'
    }
  ];

  const projects = [];

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    const filePath = path.join(dir, item.fileName);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const fileSizeMb = stats.size / (1024 * 1024);
      console.log(`Uploading [${i + 1}/6] ${item.fileName} (${fileSizeMb.toFixed(1)} MB) to Cloudinary...`);
      
      try {
        let res;
        if (fileSizeMb > 95) {
          console.log(`Using upload_large chunked upload for ${item.fileName}...`);
          res = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(filePath, {
              resource_type: 'video',
              folder: 'crochet_kids_projects_level2_2d',
              public_id: `level2_2d_project_${i + 1}`,
              chunk_size: 10000000, // 10MB chunks
              overwrite: true
            }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            });
          });
        } else {
          res = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: 'crochet_kids_projects_level2_2d',
            public_id: `level2_2d_project_${i + 1}`,
            overwrite: true
          });
        }

        console.log(`Uploaded #${i + 1}: ${res.secure_url}`);
        projects.push({
          id: `proj_l2_2d_${i + 1}`,
          title: item.title,
          emoji: item.emoji,
          difficulty: 'Level 2 2D ⭐⭐',
          time: '15-20 phút',
          stars: 40,
          color: i % 2 === 0 ? 'from-purple-500 to-pink-500' : 'from-indigo-500 to-purple-500',
          videoUrl: res.secure_url,
          fileName: item.fileName
        });
      } catch (err) {
        console.error(`Error uploading #${i + 1}:`, err);
      }
    } else {
      console.error(`File NOT found: ${filePath}`);
    }
  }

  const jsonPath = 'src/data/level2Projects2D.json';
  fs.writeFileSync(jsonPath, JSON.stringify(projects, null, 2), 'utf8');
  console.log(`Saved ${jsonPath} with ${projects.length} Level 2 2D projects.`);
}

uploadLevel2Projects2D();

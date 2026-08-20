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

const filesToUpload = [
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_Chi-tiet-don-gian-nhat-cua-moc-len-ma-ai_Media_28098943039699808_001_720p.mp4",
    publicId: 'granny_basic_mr'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_Chart-moc-don-gian-cho-nguoi-moi-bat-dau_Media_977396878691468_001_720p.mp4",
    publicId: 'granny_basic_chain'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\FSave.com_Reels_Welcome-to-another-Tip-Tuesday-today-we-_Media_1039850808440953_001_1080p.mp4",
    publicId: 'granny_corner'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\New folder (2)\\FSave.com_Reels_For-a-fun-way-to-seam-your-granny-square_Media_1375323374091320_001_1080p.mp4",
    publicId: 'granny_join_way1'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\New folder (2)\\FSave.com_Reels_For-a-seamless-way-to-join-granny-square_Media_1798259984921037_001_1080p (1).mp4",
    publicId: 'granny_join_way2'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\New folder (2)\\FSave.com_Reels_Here-s-a-fun-way-to-join-your-granny-squ_Media_1054988070422842_001_1080p.mp4",
    publicId: 'granny_join_way3'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\New folder (2)\\FSave.com_Reels_I-often-get-questions-asking-how-to-join_Media_1032862362846962_001_1080p.mp4",
    publicId: 'granny_join_way4'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\New folder (2)\\FSave.com_Reels_This-is-one-of-my-favorite-decorative-jo_Media_1414391577473213_001_1080p.mp4",
    publicId: 'granny_join_way5'
  },
  {
    localPath: "C:\\Users\\DT.HANG\\Downloads\\New folder (2)\\join 3.mp4",
    publicId: 'granny_join_way6'
  }
];

async function uploadAllLevel4() {
  const results = {};
  for (let i = 0; i < filesToUpload.length; i++) {
    const item = filesToUpload[i];
    console.log(`Uploading [${i+1}/${filesToUpload.length}] ${path.basename(item.localPath)} to Cloudinary...`);
    try {
      const stats = fs.statSync(item.localPath);
      const sizeMB = stats.size / 1024 / 1024;
      let res;
      if (sizeMB > 95) {
        console.log(`Using upload_large for ${item.publicId} (${sizeMB.toFixed(2)} MB)...`);
        res = await cloudinary.uploader.upload_large(item.localPath, {
          resource_type: 'video',
          folder: 'crochet_kids_symbols_level4_granny',
          public_id: item.publicId,
          overwrite: true,
          chunk_size: 10000000
        });
      } else {
        res = await cloudinary.uploader.upload(item.localPath, {
          resource_type: 'video',
          folder: 'crochet_kids_symbols_level4_granny',
          public_id: item.publicId,
          overwrite: true
        });
      }
      results[item.publicId] = res.secure_url;
      console.log(`Uploaded #${i+1} (${item.publicId}): ${res.secure_url}`);
    } catch (err) {
      console.error(`Error uploading #${i+1} (${item.publicId}):`, err.message || err);
    }
  }

  fs.writeFileSync('scratch/level4_granny_urls.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved scratch/level4_granny_urls.json with', Object.keys(results).length, 'URLs.');
}

uploadAllLevel4();

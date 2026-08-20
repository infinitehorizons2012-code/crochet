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

async function uploadLevel2Sheet() {
  const dir = 'C:/Users/DT.HANG/Downloads';
  const fileItems = [
    {
      fileName: 'FSave.com_Reels_Tip-moc-mui-binh-khong-bi-that-nut-mui-d_Media_1032950195983840_001_1080p.mp4',
      publicId: 'sheet_start_knot',
      title: 'Bắt Đầu (Mút Nút / Mũi Bính Bắt Đầu)'
    },
    {
      fileName: 'snapsave.vn_facebook_6a866471919d5.mp4',
      publicId: 'sheet_long_chain',
      title: 'Dây Xích Dài'
    },
    {
      fileName: 'FSave.com_Reels_Cach-giam-binh-thua-khong-can-thao-ra-la_Media_1312995184043105_001_1080p.mp4',
      publicId: 'sheet_adjust_chain_reduce',
      title: 'Thừa Bính (Giảm Bính Thừa)'
    },
    {
      fileName: 'FSave.com_Reels_Cach-them-binh-khi-thieu-do-dai-minh-can_Media_1854256171889860_001_1080p.mp4',
      publicId: 'sheet_adjust_chain_add',
      title: 'Thiếu Bính (Thêm Bính Khi Thiếu)'
    },
    {
      fileName: 'FSave.com_Reels_Cach-ket-thuc-mui-tang-hinh_Media_1456882429155767_001_1080p.mp4',
      publicId: 'sheet_finish',
      title: 'Cách Kết Thúc'
    },
    {
      fileName: 'FSave.com_Reels_Me-len-soi-on-Reels_Media_843239335075510_001_1080p.mp4',
      publicId: 'sheet_step_up',
      title: 'Cách Lên Hàng Tấm Vải'
    },
    {
      fileName: 'FSave.com_Reels_Tip-noi-soi-simply-khong-lo-nee_Media_1069200502349964_001_1080p.mp4',
      publicId: 'sheet_add_yarn',
      title: 'Cách Thêm Len (Nối Sợi)'
    },
    {
      fileName: 'Change color.mp4',
      publicId: 'sheet_change_color',
      title: 'Cách Đổi Màu Len Tấm Vải'
    }
  ];

  const results = {};

  for (let i = 0; i < fileItems.length; i++) {
    const item = fileItems[i];
    const filePath = path.join(dir, item.fileName);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const fileSizeMb = stats.size / (1024 * 1024);
      console.log(`Uploading [${i + 1}/8] ${item.fileName} (${fileSizeMb.toFixed(1)} MB) to Cloudinary...`);
      
      try {
        let res;
        if (fileSizeMb > 95) {
          console.log(`Using upload_large chunked upload for ${item.fileName}...`);
          res = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(filePath, {
              resource_type: 'video',
              folder: 'crochet_kids_symbols_level2_sheet',
              public_id: item.publicId,
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
            folder: 'crochet_kids_symbols_level2_sheet',
            public_id: item.publicId,
            overwrite: true
          });
        }

        console.log(`Uploaded #${i + 1}: ${res.secure_url}`);
        results[item.publicId] = res.secure_url;
      } catch (err) {
        console.error(`Error uploading #${i + 1}:`, err);
      }
    } else {
      console.error(`File NOT found: ${filePath}`);
    }
  }

  const jsonPath = 'scratch/level2_sheet_urls.json';
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved ${jsonPath} with ${Object.keys(results).length} URLs.`);
}

uploadLevel2Sheet();

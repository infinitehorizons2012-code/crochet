import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME || 'zopjocdi',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Uploads a local file to Cloudinary and updates crochetSymbols.js
 * @param {string} symbolId - e.g. 'ch', 'sc', 'dc'
 * @param {string} localFilePath - path to local mp4/jpg/gif file
 * @param {'video' | 'image'} resourceType - 'video' or 'image'
 */
export async function uploadAndLinkMedia(symbolId, localFilePath, resourceType = 'video') {
  if (!fs.existsSync(localFilePath)) {
    console.error("Local file does not exist:", localFilePath);
    return;
  }

  console.log(`Uploading ${localFilePath} to Cloudinary (cloud: zopjocdi)...`);
  
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
      folder: 'crochet_kids_symbols',
      public_id: `${symbolId}_${Date.now()}`
    });

    console.log("Upload Success! Cloudinary URL:", result.secure_url);

    // Update src/data/crochetSymbols.js
    const symbolsPath = path.join(process.cwd(), 'src', 'data', 'crochetSymbols.js');
    let code = fs.readFileSync(symbolsPath, 'utf8');

    const targetKey = resourceType === 'video' ? 'videoUrl' : 'imageUrl';
    
    // Replace empty or old videoUrl/imageUrl for the symbol
    const symbolRegex = new RegExp(`(id:\\s*['"]${symbolId}['"][\\s\\S]*?${targetKey}:\\s*['"])(.*?)(['"])`);
    if (symbolRegex.test(code)) {
      code = code.replace(symbolRegex, `$1${result.secure_url}$3`);
      fs.writeFileSync(symbolsPath, code, 'utf8');
      console.log(`Updated ${targetKey} for symbol '${symbolId}' in crochetSymbols.js!`);
    } else {
      console.warn(`Could not find symbol '${symbolId}' in crochetSymbols.js`);
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
}

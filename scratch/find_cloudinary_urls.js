import fs from 'fs';
import path from 'path';

const transcriptPath = 'C:/Users/DT.HANG/.gemini/antigravity/brain/0308420e-c831-48ca-83f0-4f4afd6a4d2f/.system_generated/logs/transcript.jsonl';
if (fs.existsSync(transcriptPath)) {
  const content = fs.readFileSync(transcriptPath, 'utf8');
  const matches = content.match(/https:\/\/res\.cloudinary\.com\/zopjocdi\/video\/upload\/[^\s"'\\]+/g);
  if (matches) {
    const unique = Array.from(new Set(matches));
    console.log('ALL CLOUDINARY VIDEO URLS FOUND IN TRANSCRIPT:');
    unique.forEach(u => console.log(u));
  } else {
    console.log('No matches found.');
  }
} else {
  console.log('Transcript not found.');
}

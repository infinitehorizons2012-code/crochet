import fs from 'fs';

const transcriptPath = 'C:/Users/DT.HANG/.gemini/antigravity/brain/0308420e-c831-48ca-83f0-4f4afd6a4d2f/.system_generated/logs/transcript.jsonl';
if (fs.existsSync(transcriptPath)) {
  const content = fs.readFileSync(transcriptPath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('level2_2d') || line.includes('clover') || line.includes('flower') || line.includes('apple') || line.includes('heart') || line.includes('star') || line.includes('leaf')) {
      const urls = line.match(/https:\/\/res\.cloudinary\.com\/zopjocdi\/[^\s"'\\]+/g);
      if (urls) {
        console.log(`Line ${idx+1}:`, urls);
      }
    }
  });
}

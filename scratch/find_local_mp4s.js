import fs from 'fs';
import path from 'path';

function findMp4(dir, depth = 0) {
  if (depth > 4) return;
  try {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      const p = path.join(dir, f);
      try {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
          if (!p.includes('AppData') && !p.includes('node_modules') && !p.includes('.git')) {
            findMp4(p, depth + 1);
          }
        } else if (f.toLowerCase().endsWith('.mp4')) {
          console.log(`[${stat.size} bytes] ${p}`);
        }
      } catch (e) {}
    });
  } catch (e) {}
}

console.log('SEARCHING FOR ALL MP4 FILES ON USER SYSTEM:');
findMp4('C:\\Users\\DT.HANG\\Downloads');
findMp4('C:\\Users\\DT.HANG\\Desktop');
findMp4('C:\\Users\\DT.HANG\\Documents');
findMp4('C:\\Users\\DT.HANG\\Videos');

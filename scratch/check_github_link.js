import fs from 'fs';
import path from 'path';

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js') || p.endsWith('.jsx') || p.endsWith('.json')) {
      const content = fs.readFileSync(p, 'utf8');
      if (content.toLowerCase().includes('github')) {
        console.log('FOUND GITHUB REFERENCE IN:', p);
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (l.toLowerCase().includes('github')) {
            console.log(`  Line ${idx + 1}: ${l.trim()}`);
          }
        });
      }
    }
  });
}

walk('src');

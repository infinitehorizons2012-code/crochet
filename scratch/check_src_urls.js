import fs from 'fs';
import path from 'path';

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js') || p.endsWith('.jsx') || p.endsWith('.json')) {
      const content = fs.readFileSync(p, 'utf8');
      const matches = content.match(/https:\/\/res\.cloudinary\.com\/zopjocdi\/video\/upload\/[^\s"'\\]+/g);
      if (matches) {
        console.log('FILE:', p);
        matches.forEach(m => console.log('  ', m));
      }
    }
  });
}

walk('src');

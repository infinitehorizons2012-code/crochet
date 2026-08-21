import fs from 'fs';
import path from 'path';

const sensitivePatterns = [
  /api_secret/i,
  /secret/i,
  /BD21g/i, // Cloudinary secret string
  /password/i,
  /token/i,
  /private_key/i,
  /139281895998719/ // Cloudinary API Key
];

const findings = [];

function auditDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      auditDir(p);
    } else if (p.endsWith('.js') || p.endsWith('.jsx') || p.endsWith('.json') || p.endsWith('.html') || p.endsWith('.css')) {
      const content = fs.readFileSync(p, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        sensitivePatterns.forEach(pattern => {
          if (pattern.test(line)) {
            // Ignore normal non-secret usages like "secret" in text descriptions if any
            findings.push({
              file: p,
              lineNum: idx + 1,
              pattern: pattern.toString(),
              code: line.trim()
            });
          }
        });
      });
    }
  });
}

console.log('=== STARTING FRONTEND SECURITY AUDIT FOR SRC/ DIRECTORY ===');
auditDir('src');

if (findings.length === 0) {
  console.log('✅ AUDIT PASSED: No hardcoded secrets, API secrets, or passwords found in src/!');
} else {
  console.log(`⚠️ AUDIT WARNING: Found ${findings.length} potential references in src/:`);
  findings.forEach(f => {
    console.log(`- File: ${f.file}:${f.lineNum}`);
    console.log(`  Match: ${f.pattern}`);
    console.log(`  Code: ${f.code}`);
  });
}

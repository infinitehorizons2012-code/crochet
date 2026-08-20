import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="background: #0f172a; display: flex; gap: 20px; padding: 20px;">
      <div style="width: 300px; height: 200px; position: relative; background: #1e293b; border-radius: 16px; overflow: hidden;">
        <video id="vid1" src="https://res.cloudinary.com/zopjocdi/video/upload/v1787194463/crochet_kids_symbols_level2/clover_2d.mp4" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>
      </div>
      <div style="width: 300px; height: 200px; position: relative; background: #1e293b; border-radius: 16px; overflow: hidden;">
        <video id="vid2" src="https://res.cloudinary.com/zopjocdi/video/upload/v1787194466/crochet_kids_symbols_level2/flower_2d.mp4" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>
      </div>
      <script>
        document.querySelectorAll('video').forEach(v => {
          v.play().catch(e => console.log('play error', e));
        });
      </script>
    </body>
    </html>
  `;
  await page.setContent(html);
  await page.waitForTimeout(4000);
  const screenshotPath = path.join(process.cwd(), 'scratch', 'video_play_test.png');
  await page.screenshot({ path: screenshotPath });
  console.log('SAVED TEST SCREENSHOT TO:', screenshotPath);
  await browser.close();
})();

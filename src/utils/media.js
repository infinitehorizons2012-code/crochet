/**
 * Generates a high-quality JPEG poster frame thumbnail URL from a Cloudinary video URL.
 * Uses Cloudinary's on-the-fly 'so_1' (start offset 1s) transformation.
 */
export function getVideoPosterUrl(url) {
  if (!url) return undefined;
  if (typeof url === 'string' && url.includes('/video/upload/')) {
    return url.replace('/video/upload/', '/video/upload/so_1/').replace(/\.mp4$/i, '.jpg');
  }
  return undefined;
}

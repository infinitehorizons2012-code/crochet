// Cloudinary configuration for user account 'zopjocdi'

export const CLOUDINARY_CLOUD_NAME = 'zopjocdi';

/**
 * Builds a full Cloudinary URL from a public ID or returns the URL as-is if already absolute.
 * @param {string} pathOrUrl - Public ID (e.g. 'crochet/ch_stitch') or full URL
 * @param {'image' | 'video'} resourceType - 'image' or 'video'
 * @returns {string}
 */
export function getCloudinaryMediaUrl(pathOrUrl, resourceType = 'image') {
  if (!pathOrUrl) return '';
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  // Auto-construct Cloudinary CDN URL for cloud_name: zopjocdi
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${pathOrUrl}`;
}

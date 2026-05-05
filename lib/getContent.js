import { list } from '@vercel/blob';
import { defaultContent } from './content';

const BLOB_FILENAME = 'site_content.json';

// Cached in memory for the lifetime of the server process — avoids a
// list() call on every page render. Cleared on new saves via the admin CMS.
let cachedBlobUrl = null;

export function setBlobUrl(url) {
  cachedBlobUrl = url;
}

async function getBlobUrl() {
  if (cachedBlobUrl) return cachedBlobUrl;
  const { blobs } = await list({ prefix: BLOB_FILENAME });
  if (blobs.length) cachedBlobUrl = blobs[0].url;
  return cachedBlobUrl;
}

export async function readContent() {
  try {
    const url = await getBlobUrl();
    if (!url) return defaultContent;
    const res = await fetch(url, { cache: 'no-store' });
    const stored = await res.json();
    return { ...defaultContent, ...stored };
  } catch {
    return defaultContent;
  }
}

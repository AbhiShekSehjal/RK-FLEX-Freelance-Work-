import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

// ✅ Set up your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_KEY_SECRET,
});

// ✅ Fetch all assets from a folder
async function fetchAllImageUrls(folderName = 'RkFlex_Images') {
  let nextCursor = null;
  let allResources = [];

  do {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '',
      max_results: 100,
      next_cursor: nextCursor,
    });

    allResources = allResources.concat(result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  const urls = allResources.map(res => res.secure_url);

  // ✅ Save to file (optional)
  fs.writeFileSync('image_urls.txt', urls.join('\n'));

  console.log(`✅ ${urls.length} image URLs exported to image_urls.txt`);
}

fetchAllImageUrls();

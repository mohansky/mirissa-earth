// src/pages/api/cloudinary-images.js
import { v2 as cloudinary } from 'cloudinary';

export async function get() {
  cloudinary.config({
    cloud_name: 'mogs',
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET
  });

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'images/',
      max_results: 100
    });

    const images = result.resources.map(resource => {
      const parts = resource.public_id.split('/');
      const imageId = parts[parts.length - 1];
      return {
        id: imageId,
        width: resource.width,
        height: resource.height,
        format: resource.format
      };
    });

    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
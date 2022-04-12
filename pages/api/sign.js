// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const cloudinary = require("cloudinary").v2;

export default async function Sign(_req, res) {

  const timestamp = Math.round(new Date().getTime() / 1000);

  // Get the signature using the Node.js SDK method api_sign_request
  // Cloudinary Documentation seems to avoid this method - learned about it from youtube videos 

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
};
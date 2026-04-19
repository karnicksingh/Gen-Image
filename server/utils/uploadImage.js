const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3.js");

const uploadImage = async (base64Image) => {
  const buffer = Buffer.from(base64Image, "base64");

  const fileName = `image-${Date.now()}.png`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: "image/png",
  };

  await s3.send(new PutObjectCommand(params));

  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  return url;
};

module.exports = uploadImage; 
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const Image = require('../models/imageModel');
const router = express.Router();
const path = require('path');

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer setup for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload file to S3
const uploadToS3 = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}_${path.extname(file.originalname)}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

// Route to handle file upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to S3
    const uploadResult = await uploadToS3(file);

    // Save image URL to MongoDB
    const newImage = new Image({
      url: uploadResult.Location,
    });
    await newImage.save();

    return res.status(200).json({
      message: 'File uploaded successfully',
      url: uploadResult.Location,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Route to fetch all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find({});
    return res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ error: 'Failed to fetch images' });
  }
});

module.exports = router;

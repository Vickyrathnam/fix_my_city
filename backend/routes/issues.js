const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Issue = require('../models/Issue');
const auth = require('../middleware/auth');

const router = express.Router();

// Cloudinary configuration - temporarily disabled due to invalid credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all issues
router.get('/', async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (type) query.type = type;
    if (status) query.status = status;

    const issues = await Issue.find(query)
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Issue.countDocuments(query);

    res.json({
      issues,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('CivicWatch server error');
  }
});

// Get issue by ID
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('reportedBy', 'name email');
    
    if (!issue) {
      return res.status(404).json({ message: 'CivicWatch issue not found' });
    }

    res.json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('CivicWatch server error');
  }
});

// Create new issue
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    console.log('User:', req.user);

    const { title, description, type, address, latitude, longitude } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!address || !address.trim()) {
      return res.status(400).json({ message: 'Address is required' });
    }
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Location coordinates are required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Temporarily using placeholder image URL instead of Cloudinary
    let imageUrl = 'https://picsum.photos/seed/infrastructure/400/300.jpg';
    
    // TODO: Fix Cloudinary credentials and enable image upload
    // Upload image to Cloudinary - temporarily disabled
    // try {
    //   const result = await new Promise((resolve, reject) => {
    //     cloudinary.uploader.upload_stream(
    //       { 
    //         resource_type: 'image',
    //         folder: 'infrastructure-issues'
    //       },
    //       (error, result) => {
    //         if (error) {
    //           console.error('Cloudinary upload error:', error);
    //           reject(error);
    //         } else {
    //           console.log('Cloudinary upload success:', result);
    //           resolve(result);
    //         }
    //       }
    //     ).end(req.file.buffer);
    //   });
    //   imageUrl = result.secure_url;
    // } catch (uploadError) {
    //   console.error('Image upload failed:', uploadError);
    //   return res.status(500).json({ message: 'Image upload failed' });
    // }

    const issue = new Issue({
      title: title.trim(),
      description: description.trim(),
      type,
      location: {
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
        address: address.trim()
      },
      imageUrl,
      reportedBy: req.user.id
    });

    await issue.save();
    await issue.populate('reportedBy', 'name email');

    console.log('Issue created successfully:', issue);
    res.status(201).json(issue);
  } catch (err) {
    console.error('Issue creation error:', err);
    res.status(500).json({ 
      message: 'Server error while creating issue',
      error: err.message 
    });
  }
});

// Update issue status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('reportedBy', 'name email');

    if (!issue) {
      return res.status(404).json({ message: 'CivicWatch issue not found' });
    }

    res.json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('CivicWatch server error');
  }
});

// Get nearby issues
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { radius = 5000 } = req.query; // radius in meters

    const issues = await Issue.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).populate('reportedBy', 'name email');

    res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('CivicWatch server error');
  }
});

module.exports = router;

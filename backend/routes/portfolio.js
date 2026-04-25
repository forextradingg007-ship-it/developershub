const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const items = await Portfolio.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/all', protect, async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, [
  body('title').notEmpty().withMessage('Title required'),
  body('description').notEmpty().withMessage('Description required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    res.json({ success: true, message: 'Portfolio item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

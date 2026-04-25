const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');
const { protect } = require('../middleware/auth');

// POST /api/inquiries - public (contact form)
router.post('/', [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('subject').notEmpty().withMessage('Subject required'),
  body('message').notEmpty().withMessage('Message required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/inquiries - admin
router.get('/', protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/inquiries/:id - update status (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/inquiries/:id - admin
router.delete('/:id', protect, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

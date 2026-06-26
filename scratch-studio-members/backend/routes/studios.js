const express = require('express');
const db = require('../db');
const router = express.Router();

// GET all studios
router.get('/', (req, res) => {
  try {
    const studios = db.getAllStudios();
    res.json(studios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET studio by ID
router.get('/:studioId', (req, res) => {
  try {
    const studio = db.getStudio(req.params.studioId);
    if (!studio) {
      return res.status(404).json({ error: 'Studio not found' });
    }
    res.json(studio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new studio
router.post('/', (req, res) => {
  try {
    const { studioId, name } = req.body;
    if (!studioId) {
      return res.status(400).json({ error: 'studioId is required' });
    }

    const existing = db.getStudio(studioId);
    if (existing) {
      return res.status(409).json({ error: 'Studio already exists' });
    }

    const result = db.addStudio(studioId, name);
    res.status(201).json({
      id: result.lastInsertRowid,
      studioId,
      name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE studio
router.delete('/:studioId', (req, res) => {
  try {
    const studio = db.getStudio(req.params.studioId);
    if (!studio) {
      return res.status(404).json({ error: 'Studio not found' });
    }

    db.deleteStudio(req.params.studioId);
    res.json({ message: 'Studio deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

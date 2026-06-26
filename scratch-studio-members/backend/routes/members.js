const express = require('express');
const db = require('../db');
const router = express.Router();

// GET members for a studio
router.get('/:studioId', (req, res) => {
  try {
    const { studioId } = req.params;
    const studio = db.getStudio(studioId);

    if (!studio) {
      return res.status(404).json({ error: 'Studio not found' });
    }

    const members = db.getMembers(studioId);
    const grouped = {
      managers: members.filter(m => m.role === 'manager'),
      curators: members.filter(m => m.role === 'curator'),
    };

    res.json({
      studio,
      members: grouped,
      total: members.length,
      managers: grouped.managers.length,
      curators: grouped.curators.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

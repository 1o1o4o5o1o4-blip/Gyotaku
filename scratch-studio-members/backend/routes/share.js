const express = require('express');
const router = express.Router();

// GET share link info
router.get('/:studioId', (req, res) => {
  try {
    const { studioId } = req.params;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const shareUrl = `${baseUrl}/members?studio=${studioId}`;

    res.json({
      url: shareUrl,
      studioId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

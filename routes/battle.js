const express = require('express');
const router = express.Router();
const { generateBattle } = require('../services/openai');

/**
 * Battle API Endpoint
 * Input: First entity description, second entity description
 * Output: Winner index (0 or 1), battle description
 */
router.post('/', async (req, res) => {
  try {
    const { entity1Description, entity2Description } = req.body;
    
    // Validate required parameters
    if (!entity1Description || !entity2Description) {
      return res.status(400).json({
        error: 'Missing required parameters. entity1Description and entity2Description are required.'
      });
    }
    
    // Generate battle results
    const result = await generateBattle(entity1Description, entity2Description);
    
    res.json({
      winner: result.winner, // 0: first entity, 1: second entity
      battleDescription: result.battleDescription
    });
  } catch (error) {
    console.error('Error generating battle results:', error);
    res.status(500).json({ error: 'An error occurred while generating battle results.' });
  }
});

module.exports = router; 
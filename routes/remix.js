const express = require('express');
const router = express.Router();
const { generateRemix } = require('../services/openai');

/**
 * Remix API Endpoint
 * Input: Original entity name, description, derivative description
 * Output: New entity name, new entity description
 */
router.post('/', async (req, res) => {
  try {
    const { originalName, originalDescription, derivativeDescription } = req.body;
    
    // Validate required parameters
    if (!originalName || !originalDescription || !derivativeDescription) {
      return res.status(400).json({
        error: 'Missing required parameters. originalName, originalDescription, and derivativeDescription are required.'
      });
    }
    
    // Generate remix
    const result = await generateRemix(originalName, originalDescription, derivativeDescription);
    
    res.json({
      name: result.name,
      description: result.description
    });
  } catch (error) {
    console.error('Error generating remix:', error);
    res.status(500).json({ error: 'An error occurred while generating the remix.' });
  }
});

module.exports = router; 
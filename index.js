require('dotenv').config();
const express = require('express');
const cors = require('cors');
const remixRouter = require('./routes/remix');
const battleRouter = require('./routes/battle');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/remix', remixRouter);
app.use('/api/battle', battleRouter);

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Makgora API Server',
    endpoints: {
      remix: '/api/remix',
      battle: '/api/battle'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
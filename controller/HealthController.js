const express = require('express');
const healthService = require('../service/HealthService');

const router = express.Router();

router.use('/', (req, res, next) => {
  // Checks if the request method is GET
  if (req.method !== 'GET') {
    // Method Not Allowed
    return res.status(405).header('Cache-Control', 'no-cache').send();
  }
  // Checks if the Content-Length header is present and not zero
  if (req.get('Content-Length') && parseInt(req.get('Content-Length')) !== 0) {
    console.error('Invalid content for GET request:', req.body);
    return res.status(400).header('Cache-Control', 'no-cache').send();
  }
  next();
});

router.get('/', async (req, res) => {
  // Checks if the request includes any payload, if yes, then bad request
  if (Object.keys(req.query).length !== 0) {
    console.error('Invalid request parameters for GET:', req.query);
    return res.status(400).header('Cache-Control', 'no-cache').send();
  }
  try {
    const isDatabaseConnected = await healthService.checkDatabaseConnection();

    if (isDatabaseConnected) {
      res.status(200).header('Cache-Control', 'no-cache').send();
    } else {
      // Service not available
      res.status(503).header('Cache-Control', 'no-cache').send();
    }
  } catch (error) {
    console.error('Error in health check:', error);
    res.status(500).send();
  }
});

module.exports = router;

const express = require('express');
const healthService = require('../service/HealthService');

const router = express.Router();

const healthCheckMiddleware = (req, res, next) => {
  if (req.method !== 'GET' && req.url.toString().includes('healthz')) {
    return res.status(405).header('Cache-Control', 'no-cache').send();
  }
  next();
};

const gethealthCheck = async (req, res) => {
  // Checks if the request includes any payload, if yes, then bad request
  if (Object.keys(req.query).length !== 0) {
    console.error('Invalid request parameters for GET:', req.query);
    return res.status(400).header('Cache-Control', 'no-cache').send();
  }
  if (req.get('Content-Length') && parseInt(req.get('Content-Length')) !== 0) {
    console.error('Invalid content for GET request:', req.body);
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
};

module.exports = {
  gethealthCheck,
  healthCheckMiddleware
}

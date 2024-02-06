const express = require('express');
const router = express.Router();
const healthController = require('../controller/HealthController.js');
const userController = require("../controller/UserController.js");

router.post('/v1/users', userController.createUser);
router.get('/healthz', healthController.gethealthCheck);
router.use('/', healthController.healthCheckMiddleware);


module.exports = router;
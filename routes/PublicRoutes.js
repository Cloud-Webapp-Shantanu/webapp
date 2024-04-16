const express = require('express');
const router = express.Router();
const healthController = require('../controller/HealthController.js');
const userController = require("../controller/UserController.js");

router.post('/v1/user', userController.createUser);
router.get('/healthz', healthController.gethealthCheck);
router.use('/', healthController.healthCheckMiddleware);
router.post('/v1/user/*', (req, res) => {
    res.status(404).send();
});

module.exports = router;
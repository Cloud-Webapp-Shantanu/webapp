const express = require('express');
const router = express.Router();
const userController = require("../controller/UserController.js");

router.get('/v1/users', userController.getUserById);
router.put('/v1/users', userController.updateUserById);

module.exports = router;
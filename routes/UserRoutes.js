const express = require('express');
const router = express.Router();
const userController = require("../controller/UserController.js");

router.get('/v1/user/self', userController.getUserById);
router.put('/v1/user/self', userController.updateUserById);
router.get('/v1/user/account-verification', userController.verifyAccount);

module.exports = router;
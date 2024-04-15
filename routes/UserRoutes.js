const express = require('express');
const router = express.Router();
const userController = require("../controller/UserController.js");

router.get('/v8/user/self', userController.getUserById);
router.put('/v8/user/self', userController.updateUserById);
router.get('/v8/user/account-verification', userController.verifyAccount);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require("../controller/UserController.js");

router.get('/v1/users', userController.getAllUsers);
router.get('/v1/users/:id', userController.getUserById);
router.post('/v1/users', userController.createUser);
router.delete('/v1/users/:id', userController.deleteUserById);
router.put('/v1/users/:id', userController.updateUserById);

module.exports = router;
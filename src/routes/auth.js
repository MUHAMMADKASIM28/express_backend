const express = require('express');
const UserController = require('../controller/users.js');
const isAuthenticated = require('../middleware/auth.js'); 
const router = express.Router()

// REGISTER USER
router.post('/register', UserController.register);

// LOGIN USER
router.post('/login', UserController.login);

// LOGOUT USER
router.post('/logout', isAuthenticated, UserController.logout);

module.exports = router;
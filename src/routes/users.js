const express = require('express');

const UserController = require('../controller/users.js');
const isAuthenticated = require('../middleware/auth.js'); 
const can = require('../middleware/can');

const router = express.Router()

// LIHAT/TAMPILKAN USER
router.get('/', isAuthenticated, can('view-users'), UserController.getAllUsers);
router.get('/:userId', isAuthenticated, can('view-users'), UserController.getUserById);

// // CREATE DATA - POST 
// router.post('/', UserController.createNewUser);

// EDIT USER
router.put('/:userId', isAuthenticated, can('edit-users'), UserController.updateUser);

// DELETE USER
router.delete('/:userId', isAuthenticated, can('delete-users'), UserController.deleteUser);

module.exports = router;
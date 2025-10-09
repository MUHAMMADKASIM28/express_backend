const express = require('express');

const UserController = require('../controller/users.js');
const verifyToken = require('../middleware/auth.js'); 
const authorize = require('../middleware/authorize.js');

const router = express.Router()

// LIHAT/TAMPILKAN USER
router.get('/', verifyToken, authorize('admin'), UserController.getAllUsers);
router.get('/:idUser', verifyToken, authorize('admin'), UserController.getUserById);

// REGISTER USER
router.post('/register', UserController.register);

// LOGIN USER
router.post('/login', UserController.login);

// LOGOUT USER
router.post('/logout', verifyToken, UserController.logout);

// // CREATE DATA - POST 
// router.post('/', UserController.createNewUser);

// EDIT USER
router.put('/:idUser', verifyToken, authorize('admin'), UserController.updateUser);

// DELETE USER
router.delete('/:idUser', verifyToken, authorize('admin'), UserController.deleteUser);




module.exports = router;
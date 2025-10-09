const express = require('express');

const UserController = require('../controller/users.js');
const verifyToken = require('../middleware/auth.js'); 

const router = express.Router()

// READ DATA - GET
router.get('/', verifyToken, UserController.getAllUsers);
router.get('/:idUser', verifyToken, UserController.getUserById);

// Rute Register
router.post('/register', UserController.register);

// Rute Login
router.post('/login', UserController.login);

// CREATE DATA - POST 
router.post('/', UserController.createNewUser);

// UPDATE DATA - PUT
router.put('/:idUser', verifyToken, UserController.updateUser);

// DELETE DATA - DELETE
router.delete('/:idUser', verifyToken, UserController.deleteUser);

// Rute Logout
router.post('/logout', verifyToken, UserController.logout);



module.exports = router;
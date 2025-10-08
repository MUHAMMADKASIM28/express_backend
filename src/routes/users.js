const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router()

// READ DATA - GET
router.get('/', UserController.getAllUsers);

// CREATE DATA - POST
router.post('/', UserController.createNewUser);

// UPDATE DATA - PUT
router.put('/:idUser', UserController.updateUser);

// DELETE DATA - DELETE
router.delete('/:idUser', UserController.deleteUser);



module.exports = router;
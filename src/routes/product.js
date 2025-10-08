// src/routes/product.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controller/product');

router.get('/', ProductController.getAllProduct);
router.post('/', ProductController.createNewProduct);
router.put('/:idProduct', ProductController.updateProduct);
router.delete('/:idProduct', ProductController.deleteProduct);

module.exports = router;
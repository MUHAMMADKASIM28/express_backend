const express = require('express');
const router = express.Router();
const ProductController = require('../controller/product');
const verifyToken = require('../middleware/auth.js'); 
const authorize = require('../middleware/authorize.js');

// LIHAT/TAMPILKAN PRODUK
router.get('/', verifyToken, authorize(['admin', 'user']), ProductController.getAllProduct);
router.get('/:idProduct', verifyToken, authorize(['admin', 'user']), ProductController.getProductById);

// TAMBAH PRODUK
router.post('/', verifyToken, authorize('admin'), ProductController.createNewProduct);

// EDIT PRODUK
router.put('/:idProduct', verifyToken, authorize('admin'), ProductController.updateProduct);

// HAPUS PRODUK
router.delete('/:idProduct', verifyToken, authorize('admin'), ProductController.deleteProduct);

module.exports = router;
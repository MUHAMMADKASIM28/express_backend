const express = require('express');
const router = express.Router();
const ProductController = require('../controller/product');
const isAuthenticated = require('../middleware/auth.js'); 
const can = require('../middleware/can');

// LIHAT/TAMPILKAN PRODUK
router.get('/', isAuthenticated, can('view-products'), ProductController.getAllProduct);
router.get('/:productId', isAuthenticated, can('view-products'), ProductController.getProductById);

// TAMBAH PRODUK
router.post('/', isAuthenticated, can('create-product'), ProductController.createNewProduct);

// EDIT PRODUK
router.put('/:productId', isAuthenticated, can('edit-product'), ProductController.updateProduct);

// HAPUS PRODUK
router.delete('/:productId', isAuthenticated, can('delete-product'), ProductController.deleteProduct);

module.exports = router;
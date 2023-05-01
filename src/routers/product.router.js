const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

// Endpoints para o CRUD de produtos
router.get('/', productController.listProducts);

router.post('/', productController.createProduct);

router.get('/search', productController.queryProducts);

router.get('/:id', productController.getProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;

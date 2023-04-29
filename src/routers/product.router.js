const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.listProducts);

router.post('/', productController.createProduct);

router.get('/:id', productController.getProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;

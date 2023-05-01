const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

// Endpoints para o CRUD de vendas
router.post('/', saleController.createSale);

router.get('/', saleController.listSales);

router.get('/:id', saleController.getSale);

module.exports = router;

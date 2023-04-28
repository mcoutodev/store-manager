const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.post('/', saleController.createSale);

router.get('/', saleController.listSales);

router.get('/:id', saleController.findSale);

module.exports = router;

const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { type, message } = await saleService.createSale(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);
  res.status(200).json(message);
};

module.exports = {
  createSale,
  findSale,
};

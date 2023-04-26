const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAllProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(errorMap.mapError(type)).send({ message });

  res.status(200).send(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).send({ message });

  res.status(200).send(message);
};

module.exports = { findAllProducts, getProduct };

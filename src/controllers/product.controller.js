const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

// Recebe as requisicoes e envia as respostas
// Todas as funcoes recebem dois parametros: req (requisicao) e res (resposta)
// A funcao listProducts nao recebe parametros, pois retorna todos os produtos
const listProducts = async (_req, res) => {
  const { message } = await productService.findAll();
  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { type, message } = await productService.createProduct(req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.updateProduct(id, req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(204).end();
};

const queryProducts = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.queryProducts(q);
  res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  queryProducts,
};

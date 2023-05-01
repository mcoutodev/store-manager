const { productModel } = require('../models');
const schema = require('./validations/validateInputs');

// Funções que fazem a conexão entre o model e os controllers.
// Retornan um objeto contendo o tipo e a mensagem do erro, caso exista.
const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);

  if (!product) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const createProduct = async (product) => {
  const error = schema.validateProduct(product);
  if (error.type) return error;

  const newProduct = await productModel.insert(product);
  return { type: null, message: newProduct };
};

// Verifica a existência do produto antes de atualizá-lo ou excluí-lo.
const findProduct = async (productId) => {
  const product = await productModel.findById(productId);
  if (product) return true;
  return false;
};

const updateProduct = async (productId, dataToUpdate) => {
  if (!await findProduct(productId)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  const error = schema.validateProduct(dataToUpdate);
  if (error.type) return error;

  const updatedProduct = await productModel.update(productId, dataToUpdate);
  return { type: null, message: updatedProduct };
};

const deleteProduct = async (productId) => {
  if (!await findProduct(productId)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  const affectedRows = await productModel.deleteProduct(productId);
  return { type: null, message: affectedRows };
};

const queryProducts = async (searchTerm) => {
  const result = await productModel.queryProducts(searchTerm);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  queryProducts,
};

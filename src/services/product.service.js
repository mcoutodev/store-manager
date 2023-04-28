const { productModel } = require('../models');
const schema = require('./validations/validateInputs');

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

const updateProduct = async (productId, dataToUpdate) => {
  const updatedProduct = await productModel.update(productId, dataToUpdate);
  return { type: null, message: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};

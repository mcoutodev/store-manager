const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);

  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const createProduct = async (product) => {
  const insertId = await productModel.insert(product);
  return { type: null, message: { ...product, id: insertId } };
};

module.exports = { findAll, findById, createProduct };

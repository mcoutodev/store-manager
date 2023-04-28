const { saleModel, productModel } = require('../models');
const schema = require('./validations/validateInputs');

const findProduct = async (productId) => {
  const product = await productModel.findById(productId);
  if (product) return true;
  return false;
};

const productsExists = async (saleProducts) => {
  const allProducts = saleProducts
    .map(({ productId }) => findProduct(productId));
  const result = await Promise.all(allProducts);
  return result.every((product) => product);
};

const createSale = async (saleProducts) => {
  const error = schema.validateSale(saleProducts);
  if (error.type) return error;

  if (!await productsExists(saleProducts)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  const newSale = await saleModel.insert(saleProducts);
  return { type: null, message: newSale };
};

module.exports = {
  createSale,
};

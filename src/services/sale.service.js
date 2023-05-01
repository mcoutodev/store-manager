const { saleModel, productModel } = require('../models');
const schema = require('./validations/validateInputs');

const findProduct = async (productId) => {
  const product = await productModel.findById(productId);
  if (product) return true;
  return false;
};

// Verifica se todos os produtos existem antes de criar a venda.
// Utiliza o método every para verificar se todos os produtos existem.
// O método Promise.all recebe um array de promises 
// e retorna um array com os resultados.
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

const findById = async (saleId) => {
  const saleProducts = await saleModel.findById(saleId);

  if (!saleProducts.length) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: saleProducts };
};

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

// Verifica a existência de uma venda
const findSale = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (!sale.length) return false;
  return true;
};

const deleteSale = async (saleId) => {
  if (!await findSale(saleId)) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  const affectedRows = await saleModel.deleteSale(saleId);
  return { type: null, message: affectedRows };
};

const updateSale = async (saleId, dataToUpdate) => {
  if (!await findSale(saleId)) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  const error = schema.validateSale(dataToUpdate);
  if (error.type) return error;

  if (!await productsExists(dataToUpdate)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  const updatedSale = await saleModel.update(saleId, dataToUpdate);
  return { type: null, message: updatedSale };
};

module.exports = {
  createSale,
  findById,
  findAll,
  deleteSale,
  updateSale,
};

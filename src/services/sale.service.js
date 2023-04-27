const { saleModel } = require('../models');
// const schema = require('./validations/validateInputs');

const createSale = async (saleProducts) => {
  // const error = schema.validateName(product);
  // if (error.type) return error;

  const newSale = await saleModel.insert(saleProducts);
  return { type: null, message: newSale };
};

module.exports = {
  createSale,
};

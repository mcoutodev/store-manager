const { mapError } = require('../../utils/errorList');
const {
  productSchema,
  saleSchema,
} = require('./schemas');

// Funções que validam os dados de entrada.
// Retorna um objeto com o tipo e a mensagem do erro, caso exista.
const validateProduct = (product) => {
  const { error } = productSchema.validate(product);

  if (error) {
    const { type } = error.details[0];
    return { type: mapError(type), message: error.message };
  }
  return { type: null, message: '' };
};

const validateSale = (products) => {
  const { error } = saleSchema.validate(products);

  if (error) {
    const { type } = error.details[0];
    return { type: mapError(type), message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateProduct,
  validateSale,
};

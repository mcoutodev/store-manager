const validId = 1;

const invalidId = 999;

const products = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  }
];

const validProduct = { id: 1, name: 'Martelo de Thor' };

const allProductsResponse = { type: null, message: products };

const productResponse = { type: null, message: validProduct };

const productNotFound = {
  type: 'NOT_FOUND',
  message: 'Product not found',
};

const newProduct = { name: 'Mjolnir' };

const newId = 4;

const newProductResponse = {
  type: null,
  message: { ...newProduct, id: newId },
};

const newInvalidProduct = { name: 'Mjol' };

const responseWithInvalidName = {
  type: 'INVALID_DATA',
  message: '"name" length must be at least 5 characters long',
};

const responseWithoutName = {
  type: 'BAD_REQUEST',
  message: '"name" is required',
};

const updatedProduct = { id: 1, name: 'Martelo do Batman' };

const updateResponse = {
  type: null,
  message: updatedProduct,
};

const deleteResponse = {
  type: null,
  message: '',
};

const queryResult = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

const queryResponse = {
  type: null,
  message: queryResult,
};

module.exports = {
  validId,
  invalidId,
  products,
  validProduct,
  newId,
  newProduct,
  newInvalidProduct,
  allProductsResponse,
  productResponse,
  productNotFound,
  newProductResponse,
  responseWithInvalidName,
  responseWithoutName,
  updateResponse,
  updatedProduct,
  deleteResponse,
  queryResult,
  queryResponse,
};

const validId = 1;

const invalidId = 999;

const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const validProduct = { "id": 1, "name": "Martelo de Thor" };

const happyAllProductsResponse = { type: null, message: products };

const happyProductResponse = { type: null, message: validProduct };

const productResponseNotFound = {
  type: 'NOT_FOUND',
  message: 'Product not found',
};

const newProduct = { "name": "Mjolnir" };

const newId = 4;

const happyNewProductResponse = { type: null, message: { ...newProduct, id: newId } };

const newInvalidProduct = { "name": "Mjol" };

const newProductResponseWithInvalidName = {
  type: 'INVALID_DATA',
  message: '"name" length must be at least 5 characters long',
};

const newProductResponseWithoutName = {
  type: 'BAD_REQUEST',
  message: '"name" is required',
};

module.exports = {
  validId,
  invalidId,
  products,
  validProduct,
  happyAllProductsResponse,
  happyProductResponse,
  productResponseNotFound,
  newId,
  newProduct,
  happyNewProductResponse,
  newInvalidProduct,
  newProductResponseWithInvalidName,
  newProductResponseWithoutName,
};

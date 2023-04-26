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
const unhappyProductResponse = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

module.exports = {
  validId,
  invalidId,
  products,
  validProduct,
  happyAllProductsResponse,
  happyProductResponse,
  unhappyProductResponse,
};

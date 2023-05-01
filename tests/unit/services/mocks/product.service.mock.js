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

const newProduct = { name: 'Mjolnir' };

const newInvalidProduct = { name: 'Mjol' };

const newId = 4;

const dataToUpdate = { name: 'Martelo do Batman' };

const updatedProduct = { id: 1, name: 'Martelo do Batman' };

const queryResult = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

module.exports = {
  validId,
  invalidId,
  products,
  validProduct,
  newProduct,
  newId,
  newInvalidProduct,
  dataToUpdate,
  updatedProduct,
  queryResult,
};

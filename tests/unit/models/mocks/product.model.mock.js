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
  },
];

const newProduct = { name: 'Novo Produto' };

const insertId = 4;

const dataToUpdate = { name: 'Martelo do Batman ' };

const updatedProduct = { id: 1, ...dataToUpdate };

const queryResult = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

module.exports = {
  products,
  newProduct,
  insertId,
  dataToUpdate,
  updatedProduct,
  queryResult,
};

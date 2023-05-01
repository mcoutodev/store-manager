const insertId = 3;

const saleProducts = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 3,
  },
];

const newSale = {
  id: insertId,
  itemsSold: saleProducts,
};

const invalidId = 999;

const invalidSaleProducts = [
  {
    productId: invalidId,
    quantity: 2,
  },
  ...saleProducts,
];

const saleFound = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const salesFound = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
    saleId: 1,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
    saleId: 1,
  },
];

const dataToUpdate = [
  {
    productId: 1,
    quantity: 20,
  },
  {
    productId: 2,
    quantity: 30,
  },
];

const updatedSale = {
  id: 1,
  itemsUpdated: dataToUpdate,
};

const invalidData = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 30,
  },
];

const dataWithoutId = [
  {
    quantity: 20,
  },
  {
    productId: 2,
    quantity: 30,
  },
];

const dataWithoutQuantity = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 30,
  },
];

const dataWithInvalidProduct = [
  {
    productId: invalidId,
    quantity: 20,
  },
  {
    productId: 2,
    quantity: 30,
  },
];

module.exports = {
  insertId,
  saleProducts,
  newSale,
  invalidSaleProducts,
  invalidId,
  saleFound,
  salesFound,
  dataToUpdate,
  updatedSale,
  dataWithoutId,
  invalidData,
  dataWithoutQuantity,
  dataWithInvalidProduct,
};

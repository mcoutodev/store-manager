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

const newSaleResponse = { type: null, message: newSale };

const invalidId = 999;

const invalidSaleProducts = [
  {
    productId: invalidId,
    quantity: 2,
  },
  ...saleProducts,
];

const productNotFound = {
  type: 'NOT_FOUND',
  message: 'Product not found',
};

const invalidQuantity = {
  type: 'INVALID_DATA',
  message: '"quantity" must be greater than or equal to 1',
};

const responseWithoutId = {
  type: 'BAD_REQUEST',
  message: '"productId" is required',
};

const responseWithoutQuantity = {
  type: 'BAD_REQUEST',
  message: '"quantity" is required',
};

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

const saleResponse = { type: null, message: saleFound };

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

const salesResponse = { type: null, message: salesFound };

module.exports = {
  insertId,
  saleProducts,
  newSale,
  newSaleResponse,
  invalidId,
  invalidSaleProducts,
  productNotFound,
  invalidQuantity,
  responseWithoutId,
  responseWithoutQuantity,
  saleFound,
  saleResponse,
  salesFound,
  salesResponse,
};

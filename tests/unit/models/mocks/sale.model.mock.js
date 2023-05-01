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

const saleFoundDB = [
  {
    date: '2021-09-09T04:54:29.000Z',
    product_id: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    product_id: 2,
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

const salesFoundDB = [
  {
    date: '2021-09-09T04:54:29.000Z',
    product_id: 1,
    quantity: 2,
    sale_id: 1,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    product_id: 2,
    quantity: 2,
    sale_id: 1,
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
  saleId: 1,
  itemsUpdated: dataToUpdate,
};

module.exports = {
  saleProducts,
  newSale,
  insertId,
  saleFound,
  saleFoundDB,
  salesFound,
  salesFoundDB,
  dataToUpdate,
  updatedSale,
};

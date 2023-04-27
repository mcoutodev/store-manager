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
  "id": insertId,
  "itemsSold": saleProducts,
};

const invalidId = 999;

const invalidSaleProducts = [
  {
    productId: invalidId,
    quantity: 2,
  },
  ...saleProducts,
];

module.exports = {
  insertId,
  saleProducts,
  newSale,
  invalidSaleProducts,
  invalidId,
};

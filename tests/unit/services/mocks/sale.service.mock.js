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

module.exports = {
  insertId,
  saleProducts,
  newSale,
};

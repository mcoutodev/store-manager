const connection = require('./connection');

const insert = async (saleProducts) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (DEFAULT)',
  );

  const placeholders = saleProducts
    .map((_el) => ('(?, ?, ?)'))
    .join(', ');

  const values = saleProducts
    .map(({ productId, quantity }) => [insertId, productId, quantity])
    .flat();

  await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES ${placeholders}`,
    [...values],
  );

  return { id: insertId, itemsSold: saleProducts };
};

module.exports = {
  insert,
};

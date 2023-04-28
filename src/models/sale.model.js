const connection = require('./connection');

const insert = async (saleProducts) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (DEFAULT)',
  );

  const placeholders = saleProducts
    .map((_product) => ('(?, ?, ?)'))
    .join(', ');

  const values = saleProducts
    .map(({ productId, quantity }) => [insertId, productId, quantity])
    .flat();

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES ${placeholders}`,
    [...values],
  );

  return { id: insertId, itemsSold: saleProducts };
};

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products as p 
    INNER JOIN StoreManager.sales as s ON p.sale_id = s.id
    ORDER BY p.sale_id, p.product_id`,
  );
  return sales.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
    saleId: sale.sale_id,
  }));
};

const findById = async (saleId) => {
  const [saleProducts] = await connection.execute(
    `SELECT p.product_id, p.quantity, s.date
    FROM StoreManager.sales_products as p
    INNER JOIN StoreManager.sales as s ON s.id = p.sale_id
    WHERE id = ?`,
    [saleId],
  );
  return saleProducts.map((product) => ({
    date: product.date,
    productId: product.product_id,
    quantity: product.quantity,
  }));
};

module.exports = {
  insert,
  findAll,
  findById,
};

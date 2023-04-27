const connection = require('./connection');

const insert = async (saleProducts) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (DEFAULT)',
  );

  saleProducts.forEach(async (product) => {
    await connection.execute(
      `INSERT INTO sales_products 
      (sale_id, product_id, quantity)
      VALUES
      (?, ?, ?)`,
      [insertId, product.productId, product.quantity],
    );
  });

  return { id: insertId, itemsSold: saleProducts };
};

module.exports = {
  insert,
};

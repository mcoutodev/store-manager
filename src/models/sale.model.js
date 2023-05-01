const connection = require('./connection');

const insert = async (saleProducts) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (DEFAULT)',
  );

  // Retorna um conjunto de placeholders, um para cada produto.
  const placeholders = saleProducts
    .map((_product) => ('(?, ?, ?)'))
    .join(', ');

  // Retorna um array com os valores de cada produto.
  // O método flat() "desenrola" o array de arrays em um array simples.
  // O array de arrays é necessário para que o método map() possa retornar
  // um array com o mesmo número de elementos do array original.
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

// Recupera lista de vendas, ordenando por id
// Faz um join entre as tabelas sales e sales_products
// para recuperar os dados de cada produto vendido.
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

// Recupera informações sobre uma venda, usando o id como parâmetro de busca
// Faz um join entre as tabelas sales e sales_products
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

const deleteSale = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return affectedRows;
};

module.exports = {
  insert,
  findAll,
  findById,
  deleteSale,
};

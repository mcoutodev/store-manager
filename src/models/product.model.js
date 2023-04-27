const connection = require('./connection');

// Recupera lista de produtos, ordenando por id
const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return products;
};

// Recupera informações sobre um produto, usando o id como parâmetro de busca
const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [product.name],
  );
  return insertId;
};

module.exports = { findAll, findById, insert };

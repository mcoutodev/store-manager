const connection = require('./connection');

// Recupera lista de produtos, ordenando por id
const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return products;
};

// Recupera informações sobre um produto, usando o id como parâmetro de busca
const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

// Cria um novo produto
const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );
  return { ...product, id: insertId };
};

// Atualiza um produto
const update = async (productId, dataToUpdate) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [dataToUpdate.name, productId],
  );
  return findById(productId);
};

// Exclui um produto, retornando a quantidade de linhas afetadas pela query
const deleteProduct = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
};

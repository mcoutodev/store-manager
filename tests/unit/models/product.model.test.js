const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { products, newProduct, insertId } = require('./mocks/product.model.mock');

describe('Testa os models de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Inserindo um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    const result = await productModel.insert(newProduct);
    expect(result).to.be.equal(insertId);
  });

  afterEach(function () {
    sinon.restore();
  });
});

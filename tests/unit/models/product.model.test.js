const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { products } = require('./mocks/product.model.mock');

describe('Model: productModel', function () {
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
});

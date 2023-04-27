const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const { insertId, saleProducts, newSale } = require('./mocks/sale.model.mock');

describe('Testa os models de vendas', function () {
  it('Inserindo uma nova venda', async function () {
    sinon
      .stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId }])
      .onSecondCall()
      .resolves(newSale);

    const result = await saleModel.insert(saleProducts);
    expect(result).to.be.deep.equal(newSale);
  });

  afterEach(function () {
    sinon.restore();
  });
});

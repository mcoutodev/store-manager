const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const {
  insertId,
  saleProducts,
  newSale,
  saleFound,
  saleFoundDB,
  salesFound,
  salesFoundDB,
} = require('./mocks/sale.model.mock');

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

  it('Recuperando uma venda pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([saleFoundDB]);
    const result = await saleModel.findById(1);
    expect(result).to.be.deep.equal(saleFound);
  });

  it('Recuperando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFoundDB]);
    const result = await saleModel.findAll();
    expect(result).to.be.deep.equal(salesFound);
  });

  afterEach(function () {
    sinon.restore();
  });
});

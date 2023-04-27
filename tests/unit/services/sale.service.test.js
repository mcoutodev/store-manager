const sinon = require('sinon');
const { expect } = require('chai');

const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { newSale, saleProducts } = require('./mocks/sale.service.mock');

describe('Testa os services de vendas', function () {
  describe('Criando uma nova venda', function () {
    it('com sucesso', async function () {
      sinon.stub(saleModel, 'insert').resolves(newSale);
      const result = await saleService.createSale(saleProducts);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(newSale);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

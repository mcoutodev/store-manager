const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const {
  newSale,
  saleProducts,
  newSaleResponse,
} = require('./mocks/sale.controller.mock');

chai.use(sinonChai);

describe('Testa os controllers de vendas', () => {
  describe('Criando um novo produto', () => {
    it('com sucesso', async () => {
      const res = {};
      const req = { body: saleProducts };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, 'createSale')
        .resolves(newSaleResponse);

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

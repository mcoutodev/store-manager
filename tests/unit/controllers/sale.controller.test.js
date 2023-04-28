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
  invalidSaleProducts,
  productNotFound,
  invalidQuantity,
  responseWithoutId,
  responseWithoutQuantity,
  saleResponse,
  saleFound,
  salesResponse,
  salesFound,
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

    it('com um productId inválido', async () => {
      const res = {};
      const req = { body: invalidSaleProducts };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, 'createSale')
        .resolves(productNotFound);

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: productNotFound.message });
    });

    it('com uma quantidade inválida', async () => {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 0 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, 'createSale')
        .resolves(invalidQuantity);

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: invalidQuantity.message });
    });

    it('sem um productId', async () => {
      const res = {};
      const req = { body: [{ quantity: 2 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, 'createSale')
        .resolves(responseWithoutId);

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: responseWithoutId.message });
    });

    it('sem uma quantidade', async () => {
      const res = {};
      const req = { body: [{ productId: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, 'createSale')
        .resolves(responseWithoutQuantity);

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: responseWithoutQuantity.message });
    });
  });

  describe('Recuperando uma venda pelo ID', function () {
    it('com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, 'findById')
        .resolves(saleResponse);

      await saleController.findSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleFound);
    })
  })

  describe('Recuperando todas as vendas', function () {
    it('com sucesso', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, 'findAll')
        .resolves(salesResponse);

      await saleController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesFound);
    })
  })

  afterEach(function () {
    sinon.restore();
  });
});

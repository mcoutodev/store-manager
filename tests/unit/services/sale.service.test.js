const sinon = require('sinon');
const { expect } = require('chai');

const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const {
  newSale,
  saleProducts,
  invalidSaleProducts,
  saleFound,
  salesFound,
  updatedSale,
  dataToUpdate,
  invalidData,
  dataWithoutId,
  dataWithoutQuantity,
  dataWithInvalidProduct,
} = require('./mocks/sale.service.mock');

describe('Testa os services de vendas', function () {
  describe('Criando uma nova venda', function () {
    it('com sucesso', async function () {
      sinon.stub(saleModel, 'insert').resolves(newSale);
      const result = await saleService.createSale(saleProducts);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(newSale);
    });

    it('sem um productId', async function () {
      const result = await saleService.createSale([
        { quantity: 2 },
      ]);
      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"productId" is required');
    });

    it('sem quantity', async function () {
      const result = await saleService.createSale([
        { productId: 1 },
      ]);
      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"quantity" is required');
    });

    it('com quantidade inválida', async function () {
      const result = await saleService.createSale([
        { productId: 1, quantity: 0 },
      ]);
      expect(result.type).to.be.equal('INVALID_DATA');
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('com um productId inválido', async function () {
      const result = await saleService.createSale(invalidSaleProducts);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  describe('Recuperando uma venda pelo ID', function () {
    it('com sucesso', async function () {
      sinon.stub(saleModel, 'findById').resolves(saleFound);
      const result = await saleService.findById(saleFound);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(saleFound);
    });

    it('com um ID inválido', async function () {
      const result = await saleService.findById(999);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Sale not found');
    });
  });

  describe('Recuperando todas as vendas', function () {
    it('com sucesso', async function () {
      sinon.stub(saleModel, 'findAll').resolves(salesFound);
      const result = await saleService.findAll(salesFound);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(salesFound);
    });
  });

  describe('Deletando uma venda', function () {
    it('com sucesso', async function () {
      sinon.stub(saleModel, 'deleteSale').resolves(1);
      const result = await saleService.deleteSale(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(1);
    });

    it('com um ID inválido', async function () {
      const result = await saleService.deleteSale(999);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Sale not found');
    });
  });

  describe('Atualizando uma venda', function () {
    it('com sucesso', async function () {
      sinon.stub(saleModel, 'update').resolves(updatedSale);
      const result = await saleService.updateSale(1, dataToUpdate);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(updatedSale);
    });

    it('com um ID inválido', async function () {
      const result = await saleService.updateSale(999, dataToUpdate);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Sale not found');
    });

    it('com quantidade inválida', async function () {
      const result = await saleService.updateSale(1, invalidData);
      expect(result.type).to.be.equal('INVALID_DATA');
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('sem um productId', async function () {
      const result = await saleService.updateSale(1, dataWithoutId);
      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"productId" is required');
    });

    it('sem quantity', async function () {
      const result = await saleService.updateSale(1, dataWithoutQuantity);
      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"quantity" is required');
    });

    it('com um productId inválido', async function () {
      const result = await saleService.updateSale(1, dataWithInvalidProduct);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

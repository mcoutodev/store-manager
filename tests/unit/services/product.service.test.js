const sinon = require('sinon');
const { expect } = require('chai');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const {
  validId,
  invalidId,
  products,
  validProduct,
  newProduct,
  newId,
  newInvalidProduct,
  dataToUpdate,
  updatedProduct,
  queryResult,
} = require('./mocks/product.service.mock');

describe('Testa os services de produtos', function () {
  describe('Recuperando a lista de produtos', function () {
    it('com sucesso', async function () {
      sinon.stub(productModel, 'findAll').resolves(products);
      const result = await productService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(products);
    });
  });

  describe('Recuperando um produto pelo id', function () {
    it('com sucesso', async function () {
      sinon.stub(productModel, 'findById').resolves(validProduct);
      const result = await productService.findById(validId);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(validProduct);
    });

    it('com um ID inválido', async function () {
      const result = await productService.findById(invalidId);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  describe('Criando um novo produto', function () {
    it('com sucesso', async function () {
      sinon.stub(productModel, 'insert').resolves({ ...newProduct, id: newId });
      const result = await productService.createProduct(newProduct);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({ ...newProduct, id: newId });
    });

    it('com um nome inválido', async function () {
      const result = await productService.createProduct(newInvalidProduct);
      expect(result.type).to.be.equal('INVALID_DATA');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('sem um nome', async function () {
      const result = await productService.createProduct({});
      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"name" is required');
    });
  });

  describe('Atualizando um produto', function () {
    it('com sucesso', async function () {
      sinon.stub(productModel, 'update').resolves(updatedProduct);
      const result = await productService.updateProduct(1, dataToUpdate);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(updatedProduct);
    });

    it('com um ID inválido', async function () {
      const result = await productService.updateProduct(invalidId, dataToUpdate);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });

    it('com um nome inválido', async function () {
      const result = await productService.updateProduct(1, newInvalidProduct);
      expect(result.type).to.be.equal('INVALID_DATA');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('sem um nome', async function () {
      const result = await productService.updateProduct(1, {});
      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"name" is required');
    });
  });

  describe('Excluindo um produto', function () {
    it('com sucesso', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves(1);
      const result = await productService.deleteProduct(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(1);
    });

    it('com um ID inválido', async function () {
      const result = await productService.deleteProduct(invalidId);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  describe('Buscando produtos por um termo de busca', function () {
    it('com sucesso', async function () {
      sinon.stub(productModel, 'queryProducts').resolves(queryResult);
      const result = await productService.queryProducts('ma');
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(queryResult);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

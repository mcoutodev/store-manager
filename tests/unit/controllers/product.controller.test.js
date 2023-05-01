const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const {
  validId,
  invalidId,
  products,
  validProduct,
  newId,
  newProduct,
  newInvalidProduct,
  allProductsResponse,
  productResponse,
  productNotFound,
  newProductResponse,
  responseWithInvalidName,
  responseWithoutName,
  updateResponse,
  updatedProduct,
  deleteResponse,
  queryResponse,
  queryResult,
} = require('./mocks/product.controller.mock');

chai.use(sinonChai);

describe('Testa os controllers de produtos', () => {
  describe('Recuperando a lista de produtos', () => {
    it('com sucesso', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'findAll')
        .resolves(allProductsResponse);

      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Recuperando um produto pelo id', () => {
    it('com sucesso', async () => {
      const res = {};
      const req = { params: { id: validId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'findById')
        .resolves(productResponse);

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(validProduct);
    });

    it('com id inválido', async () => {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'findById')
        .resolves(productNotFound);

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: productNotFound.message });
    });
  });

  describe('Criando um novo produto', () => {
    it('com sucesso', async () => {
      const res = {};
      const req = { body: newProduct };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves(newProductResponse);

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ ...newProduct, id: newId });
    });

    it('com um nome inválido', async () => {
      const res = {};
      const req = { body: newInvalidProduct };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves(responseWithInvalidName);

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: responseWithInvalidName.message });
    });

    it('sem um nome', async () => {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves(responseWithoutName);

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: responseWithoutName.message });
    });
  });

  describe('Atualizando um produto', function () {
    it('com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'updateProduct')
        .resolves(updateResponse);

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProduct);
    });

    it('com id inválido', async () => {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'updateProduct')
        .resolves(productNotFound);

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: productNotFound.message });
    });
  });

  describe('Excluindo um produto', function () {
    it('com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon
        .stub(productService, 'deleteProduct')
        .resolves(deleteResponse);

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('com id inválido', async () => {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'deleteProduct')
        .resolves(productNotFound);

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: productNotFound.message });
    });
  });

  describe('Recuperando produtos por query', function () {
    it('com sucesso', async function () {
      const res = {};
      const req = { query: { q: 'ma' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'queryProducts')
        .resolves(queryResponse);

      await productController.queryProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(queryResult);
    });

    it('retorna todos os produtos caso o termo de busca esteja vazio', async function () {
      const res = {};
      const req = { query: { q: '' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'queryProducts')
        .resolves(allProductsResponse);

      await productController.queryProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

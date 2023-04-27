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
  happyAllProductsResponse,
  happyProductResponse,
  productResponseNotFound,
  newId,
  newProduct,
  happyNewProductResponse,
  newInvalidProduct,
  newProductResponseWithInvalidName,
  newProductResponseWithoutName,
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
        .resolves(happyAllProductsResponse);

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
        .resolves(happyProductResponse);

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
        .resolves(productResponseNotFound);

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
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
        .resolves(happyNewProductResponse);

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
        .resolves(newProductResponseWithInvalidName);

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('sem um nome', async () => {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves(newProductResponseWithoutName);

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

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
  unhappyProductResponse,
  newId,
  newProduct,
  happyNewProductResponse,
} = require('./mocks/product.controller.mock');

chai.use(sinonChai);

describe('Testa o controller de produtos', () => {
  it('Deve retornar um array com todos os produtos', async () => {
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

  it('Deve retornar um produto com o id informado', async () => {
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

  it('Deve retornar um erro caso o id informado não seja válido', async () => {
    const res = {};
    const req = { params: { id: invalidId } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'findById')
      .resolves(unhappyProductResponse);

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Deve criar um novo produto', async () => {
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

  afterEach(function () {
    sinon.restore();
  });
});

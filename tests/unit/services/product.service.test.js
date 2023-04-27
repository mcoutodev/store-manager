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
} = require('./mocks/product.service.mock');

describe('Testa o serviço de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(products);
    const result = await productService.findAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(products);
  });

  it('Recuperando um produto pelo ID', async function () {
    sinon.stub(productModel, 'findById').resolves(validProduct);
    const result = await productService.findById(validId);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(validProduct);
  });

  it('Recuperando um produto por um ID inválido', async function () {
    sinon.stub(productModel, 'findById').resolves(null);
    const result = await productService.findById(invalidId);
    expect(result.type).to.be.equal('NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });

  it('Criando um novo produto', async function () {
    sinon.stub(productModel, 'insert').resolves(newId);
    const result = await productService.createProduct(newProduct);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal({ ...newProduct, id: newId });
  });

  afterEach(function () {
    sinon.restore();
  });
});

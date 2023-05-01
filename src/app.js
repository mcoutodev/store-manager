const express = require('express');

const { productRouter, saleRouter } = require('./routers');

const app = express();

app.use(express.json());

// Uso das rotas definidas no arquivo productRouter.js
app.use('/products', productRouter);

// Uso das rotas definidas no arquivo saleRouter.js
app.use('/sales', saleRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

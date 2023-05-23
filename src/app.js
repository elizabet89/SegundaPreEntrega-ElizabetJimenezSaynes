const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const productManager = new ProductManager('produts.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  res.json(product);
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
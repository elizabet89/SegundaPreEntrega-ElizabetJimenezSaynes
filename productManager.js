const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = "./produts.js";
  }

  addProduct(product) {
    const products = this.getProducts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, ...product };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      this.saveProducts(products);
      return updatedProduct;
    }
    return null;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    this.saveProducts(updatedProducts);
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products), 'utf8');
  }
}
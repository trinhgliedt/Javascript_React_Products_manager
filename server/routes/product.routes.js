const ProductController = require('../controllers/product.controller');

module.exports = app => {
    // app.get('/api', ProductController.index);
    app.get('/api/products', ProductController.displayAll);
    app.get('/api/products/:id', ProductController.displayOne);
    app.post('/api/products/create', ProductController.createProduct);
    app.put('/api/products/:id', ProductController.updateProduct);
    app.delete('/api/products/:id', ProductController.deleteProduct);
};
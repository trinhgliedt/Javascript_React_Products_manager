const { response } = require("express")
const { Product} = require('../models/product.model');
// require("./server/config/mongoose.config");
require(".././config/mongoose.config");

// module.exports.index = (req, res) =>{
//     res.json({
//         message: "Hello World!"
//     });
// };

module.exports = {
    displayAll(req, res) {
        Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.json(err);
        })
    },

    displayOne(req, res) {
        Product.findById(req.params.id)
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.json(err);
        })
    },

    createProduct(req, res) {
        Product.create(req.body)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.json(err);
        })
    },

    updateProduct(req, res) {
        Product.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            // return the updated object rather than the old info
            new: true,
          })
            .then((product) => {
              // the product with updated information
              console.log("update method .then");
              res.json(product);
            })
            .catch((err) => {
              // so that axios' .catch will be triggered
              // for validation errors and other errors
              console.log("update method .catch");
              res.status(400).json(err);
            });
    },
    
    deleteProduct(req, res) {
        console.log("delete method executed", "url params:", req.params);
    
        Product.findByIdAndDelete(req.params.id)
          .then((product) => {
            // the product that was deleted or null if id not found
            res.json(product);
          })
          .catch((err) => {
            res.json(err);
          });
      },
}
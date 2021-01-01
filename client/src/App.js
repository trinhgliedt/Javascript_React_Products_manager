import React from 'react';
import Products from './views/Products';
import SingleProduct from './views/SingleProduct';
import UpdateProduct from './views/UpdateProduct';
import ProductForm from './components/ProductForm';
import { Redirect, Router } from "@reach/router";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Products path="/products"/>
        <ProductForm path="/products/create"/>
        <UpdateProduct path="/products/edit/:id"/>
        <SingleProduct path="/products/:id"/>
        <Redirect from="/" to="/products" noThrow="true" />
      </Router>
    </div>
  );
}

export default App;

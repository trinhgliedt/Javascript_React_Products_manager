import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from "@reach/router";
import ProductList from './ProductList';


const ProductForm = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            title,
            price,
            desc
        };
        console.log(newProduct);

        axios
        .post("http://localhost:8000/api/products/create", newProduct)
        .then( (res) => {
            console.log("response from axios inside create: ",res);
            navigate('/products');
        })
        .catch( err => console.log(err));
    }

    return (
        <div>
            <form className="form-group mx-5 col-4" onSubmit= { handleSubmit }>
                <h1>Product Manager</h1>
                <div>
                    <label>Title</label>
                    <input className="form-control" onChange={(e) => setTitle(e.target.value)} type="text" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" onChange={(e) => setPrice(e.target.value)} type="number" min = "0" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input className="form-control" onChange={(e) => setDesc(e.target.value)} type="text" />
                </div>
                <input className="btn btn-info mt-3" type="submit" />
            </form>
            <ProductList />
        </div>
    );
}
export default ProductForm;

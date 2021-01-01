import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate, Link } from "@reach/router";


const UpdateProduct = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/products/"+ props.id)
          .then((res) => {
            console.log("edit product .then!!!");
            // console.log(res);
            setTitle(res.data.title);
            setPrice(res.data.price);
            setDesc(res.data.desc);
          })
          .catch((err) => {
            console.error(err);
          });
      });


    const handleSubmit = (e) => {
        e.preventDefault();

        const editedProduct = {
            title,
            price,
            desc
        };
        console.log(editedProduct);

        axios
        .put("http://localhost:8000/api/products/"+ props.id, editedProduct)
        .then( (res) => {
            console.log(res);
            navigate("/products/"+ props.id,);
        })
        .catch( err => {
            console.log(err);
            setErrors(err.response.data.errors);

        }
            );
    }

    return (
        <div>
            <Link to={`/products`}>All products</Link> 
            <form className="mx-5 col-4" onSubmit= { handleSubmit }>
                <h1>Product Manager</h1>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" 
                    onChange={(e) => setTitle(e.target.value)} 
                    type="text"
                    value = {title}
                    />{errors?.title && (
                    <span className="text-danger">{errors.title?.message}</span>)} 
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" 
                    onChange={(e) => setPrice(e.target.value)} 
                    type="number"
                    value = {price.toLocaleString()}
                    />
                    {errors?.price && (<span className="text-danger">{errors.price?.message}</span>)} 
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input className="form-control" 
                    onChange={(e) => setDesc(e.target.value)} 
                    type="text" 
                    value = {desc}
                    />{errors?.desc && (
            <span className="text-danger">{errors.desc?.message}</span>
          )}
                </div>
                <input className="btn btn-info mt-3" type="submit" />
            </form>
        </div>
    );
}
export default UpdateProduct;

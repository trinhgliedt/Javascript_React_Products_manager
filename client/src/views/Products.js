import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";


const Products = (props) => {
  // console.log(props);

  // before we get a response from our DB, our data is null
  const [products, setProducts] = useState(null);

  // arguments passed to useEffect
  // arg1: call back function
  // arg2: empty array which means run this only once
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleDelete(delId) {
    axios
      .delete("http://localhost:8000/api/products/" + delId)
      .then((res) => {
        // console.log(res);

        const filteredProducts = products.filter((product) => {
          // returns false only when the product._id === delId
          // when false is returned to .filter, it will filter this one out
          return product._id !== delId;
        });

        // update the state to cause a re-render so our product that was
        // deleted from DB will be removed from being displayed as well
        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (products === null) {
    return "Loading...";
  }

  return (
    <div>
        <Link to={`/products/create`}>Create new product</Link>
      {products.map((product) => {
        return (
          <div className="card p-3 mb-3 mt-4" key={product._id}>
            <h3>
              <Link to={`/products/${product._id}`}>{product.title}</Link>
            </h3>
            <p>Price: ${product.price.toLocaleString()}</p>
            <p>ID: {product._id}</p>
            <p>Description: {product.desc}</p>
            <button
                  onClick={(event) => {
                    navigate(`/products/edit/${product._id}`);
                  }}
                  className="col-2 offset-5 btn btn-outline-warning mr-1"
                >
                  Edit
            </button>
            <button
              onClick={(event) => {
                handleDelete(product._id);
              }}
              className="col-2 offset-5 btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;

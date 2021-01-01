import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";


const Products = (props) => {
  // console.log(props);

  // before we get a response from our DB, our data is null
  const [Products, setProducts] = useState(null);

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

  if (Products === null) {
    return "Loading...";
  }

  return (
    <div>
        <h3>All Products: </h3>
      {Products.map((product) => {
        return (
          <div className="" key={product._id}>
            <p>
              <Link to={`/products/${product._id}`}>{product.title}</Link>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;

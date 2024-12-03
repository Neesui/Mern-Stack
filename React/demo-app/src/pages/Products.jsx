import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4  g-4">
          {product.map((item,i) => {
            return <Card key={i}  data={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Products;

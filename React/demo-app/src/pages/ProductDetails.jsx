import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [products, setProducts] = useState({});
  const params = useParams();
  const id = params.productId;

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  // add to cart
  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartData")) || [];
    const productItem = {
      id: products.id,
      title: products.title,
      price: products.price,
      description: products.description,
      image: products.image,
      quantity: 1,
    };
    // to check if the item is already in the cart or not
    const existingItem = cartItems.find((item) => item.id === products.id);

  if (existingItem) {
    toast.error(`Item is already present in the cart
`);
  } else {
    cartItems.push(productItem);
    localStorage.setItem("cartData", JSON.stringify(cartItems));
    toast.success(`Item added to the cart`);
  }
  }
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <div className="container">
        <div className="row d-flex justify-content-around align-items-center my-4">
          <div className="col-md-3">
            <img src={products.image} alt={products.title} width={300} />
          </div>
          <div className="col-md-8 ">
            <h1>{products.title}</h1>
            <h1 className="text-warning">${products.price}</h1>
            <p>{products.description}</p>
            <p className="text-primary">
              <strong>Category:</strong>
              {products.category}
            </p>
            <div className="my-3">
              <button className="btn btn-warning" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

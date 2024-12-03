import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const CartData = JSON.parse(localStorage.getItem("cartData"));
    setProducts(CartData);
  }, []);

  // increase quantity
  const increaseQty = (id) => {
    const updateItem = products.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setProducts(updateItem);
    localStorage.setItem("cartData", JSON.stringify(updateItem));
  };
  
  // decrease quantity
  const decreaseQty = (id) => {
    const updateItem = products.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setProducts(updateItem);
    localStorage.setItem("cartData", JSON.stringify(updateItem));
  };

  // remove item from the cart
  const removeCartItem = (id, title) => {
    const confirm = window.confirm(
      "Are you sure want to delete this item from the cart ?"
    );
    if (confirm) {
      const filtercart = products.filter((item) => item.id !== id);
      localStorage.setItem("cartData", JSON.stringify(filtercart));
      setProducts(filtercart);
      toast.success(`${title} has been deleted from the cart successfully.`);
    }
  };
  return (
    <>
    <ToastContainer theme="colored" position="top-center" className="text-white" />
      <div className="container">
        <div className="row d-flex justify-content-between my-5">
          {products.length === 0 ? (
            <h2 className="text-center text-danger">Your cart is Empty</h2>
          ) : (
            <>
              <h2 className="text-center text-success">Your cart Items</h2>
              <div className="col-md-8 shadow p-3">
                {products.map((item, index) => (
                  <div key={index}>
                    <div className="row d-flex align-items-center ">
                      <div className="col-2">
                        <img src={item.image} alt={item.title} width={100} />
                      </div>
                      <div className="col-4">
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                      </div>
                      <div className="col-1">
                        <p className="text-warning">
                          <strong>${item.price}</strong>
                        </p>
                      </div>
                      <div className="col-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => increaseQty(item.id)}
                        >
                          +
                        </button>
                        &nbsp;
                        <span>{item.quantity}</span>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => decreaseQty(item.id)}
                        >
                          -
                        </button>
                        &nbsp;
                      </div>
                      <div className="col-1">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(item.id, item.title)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <div className="col-md-3">
                <h2>Cart Summary</h2>
                <hr />
                <p>
                  <strong>Units: </strong>
                  {products.reduce((ac, item) => ac + Number(item.quantity), 0)}
                </p>
                <hr />
                <p>
                  <strong>Total: </strong> $
                  {products.reduce(
                    (ac, item) => ac + Number(item.price) * item.quantity,
                    0
                  )}
                </p>
                <hr />
                <button className="btn btn-warning">Check Out</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

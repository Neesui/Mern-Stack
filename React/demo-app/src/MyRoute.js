import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Show from "./context/Show";
import Notfound from "./pages/Notfound";
import Cartreduce from "./redux/Cartreduce";
const MyRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="productdetail/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="register" element={<Register />} />
          <Route path="context" element={<Show />} />
        <Route path="redux" element={<Cartreduce />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default MyRoute;

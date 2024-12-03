import React from "react";
import { useSelector } from "react-redux";
import ChangeItems from "./ChangeItems";
import Student from "./reducers/Student";
import StudentForm from "./reducers/StudentForm";
const Cartreduce = () => {
  const { cartCount } = useSelector((state) => state.cart);
  return (
    <>
      <h2 className="text-center text-primary">
        The total number of items in the cart is {cartCount}.
      </h2>
      <ChangeItems />
      <Student />
      <StudentForm />
    </>
  );
};

export default Cartreduce;

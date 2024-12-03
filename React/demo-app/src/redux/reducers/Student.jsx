import React from "react";
import { useSelector } from "react-redux";

const Student = () => {
  const {name} = useSelector((state) => state.std);
  return (
    <>
      <h2>The name of the student is {name}.</h2>
    </>
  );
};

export default Student;

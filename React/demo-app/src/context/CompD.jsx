import React, { useContext } from "react";
import { Global } from "./GlobalContextProvider";

const CompD = () => {
  const {name,address,age} = useContext(Global);
  return (
    <>
      <h2>My name is {name}.</h2>
      <h2>I lives in {address}.</h2>
      <h2>I am {age} years old.</h2>
    </>
  );
};

export default CompD;

import React, { createContext } from "react";

export const Global = createContext();
const GlobalContextProvider = (props) => {
  const student = {
    name: "Bibash Cdry",
    address: "chautara",
    age: 19,
  };
  return <Global.Provider value={student}>{props.children}</Global.Provider>;
};

export default GlobalContextProvider;

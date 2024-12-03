import React from "react";
import { useDispatch } from "react-redux";
const ChangeItems = () => {
  const dispatch = useDispatch();
  const add = () => {
    dispatch({ type: "ADD_TO_CART" });
  };
  const reduce = () => {
    dispatch({ type: "REDUCE_TO_CART" });
  };
  return (
    <>
      <div className="my-2">
        <div className="row d-flex justify-content-around">
          <div className="col-3">
            <button className="btn btn-primary" onClick={add}>
              Add
            </button>
          </div>
          <div className="col-3">
            <button className="btn btn-danger" onClick={reduce}>reduce</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeItems;

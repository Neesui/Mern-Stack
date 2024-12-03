import React, { useState } from "react";
import { useDispatch } from "react-redux";

const StudentForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  
  const change = (e) => {
    e.preventDefault();
    dispatch({ type: "CHANGE_NAME", payload: name });
  };

  return (
    <>
      <div className="container my-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <input
              type="text"
              name="name"
              id="name"
              className="form-control my-2"
              onChange={(e) => setName(e.target.value)}
            />
            <button  className="btn btn-primary" onClick={change}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForm;

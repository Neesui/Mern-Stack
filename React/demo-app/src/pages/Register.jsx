import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const Register = () => {
  return (
    <Formik
      initialValues={{
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
      }}
      validationSchema={Yup.object({
        fname: Yup.string()
          .required("first name is mandatory")
          .max(15, "fname must be less than 15 characters"),
        lname: Yup.string()
          .required("last name is mandatory")
          .max(15, "lname must be less than 15 characters"),
        email: Yup.string()
          .required("email is mandatory")
          .email("invalid email format"),
        password: Yup.string()
          .required("password is mandatory")
          .matches(
            /^(?=.*[a-z])(?=.*[A-z])(?=.*[0-9])(?=.*[@#$/_])[a-zA-Z0-9@#$!%_-]{8,30}$/,
            "password must contain at least one uppercase alphabet, one lowercase alphabets, a special character and a numeric value. And it must be at least of 8 characters."
          ),
        cpassword: Yup.string()
          .required("confirm password is mandatory")
          .oneOf(
            [Yup.ref("password")],
            "confirm password and password must match"
          ),
      })}
    >
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <h2 className="text-center text-muted">Register Form</h2>
            <Form className="shadow p-3 rounded-2" autoComplete="off">
              <div className="mb-3" >
                <label htmlFor="fname">First Name</label>
                <Field
                  type="text"
                  name="fname"
                  id="fname"
                  className="form-control"
                ></Field>
                <ErrorMessage name="fname">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <label htmlFor="lname">Last Name</label>
                <Field
                  type="text"
                  name="lname"
                  id="lname"
                  className="form-control"
                ></Field>
                <ErrorMessage name="lname">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                ></Field>
                <ErrorMessage name="email">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                ></Field>
                <ErrorMessage name="password">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword">Confirm Password</label>
                <Field
                  type="cpassword"
                  name="cpassword"
                  id="cpassword"
                  className="form-control"
                ></Field>
                <ErrorMessage name="cpassword">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Register;

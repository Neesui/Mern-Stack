import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid">
      <footer className="d-flex flex-wrap justify-content-around align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <i className="bi bi-bootstrap"></i>
          </Link>
          <span className="mb-3 mb-md-0 text-body-secondary">
            &copy; 2024 Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link className="text-body-secondary" to="#">
              <i className="bi bi-twitter"></i>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-body-secondary" to="#">
            <i className='bi bi-facebook'></i></Link>
          </li>
          <li className="ms-3">
            <Link className="text-body-secondary" to="#">
            <i className='bi bi-instagram'></i></Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;

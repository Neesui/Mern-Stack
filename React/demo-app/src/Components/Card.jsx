import React from "react";
import { Link } from "react-router-dom";
const Card = (props) => {
  const { title, price, image, id } = props.data;
  return (
    <>
      <div className="col">
        <div className="card">
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <h4>{price}</h4>
            <Link to={`/productdetail/${id}`} className="btn btn-success">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery("libraryDetail", () =>
    fetch(`http://localhost:3002/books/${id}`).then((res) => res.json())
  );

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return "An error has occurred: ";
  if (data)
    return (
      <div className="cardDetail mt-5">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={data.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{data.author}</h5>
              <h5 className="card-title">{data.price}</h5>
              <p className="card-text">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Detail;

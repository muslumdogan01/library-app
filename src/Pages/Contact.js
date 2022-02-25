import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import client from "../api/index";
import queryClient from "../query";

const createFrom = async ({ email, password }) => {
  const res = await client.post("/books", {
    email,
    password,
  });
  return res.data;
};

const Contact = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error, data } = useQuery("contact", () => {
    return client.get("/books").then((res) => res.data);
  });
  // console.log(data);

  const {
    mutate: fomrMutate,
    isLoading: loadingFrom,
    isError: loadingError,
  } = useMutation(createFrom, {
    onSuccess: (successData) => {
      queryClient.invalidateQueries("contact")
    },
  });

  if (isLoading || loadingFrom) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-3">
        <label for="formGroupExampleInput" className="form-label">
          E-mail
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Example input placeholder"
        />
      </div>
      <div className="mb-3">
        <label for="formGroupExampleInput2" className="form-label">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Another input placeholder"
        />
      </div>
      <div className="col-12">
        <button
          onClick={() => {
            fomrMutate({ email, password });
          }}
          type="submit"
          className="btn btn-primary"
        >
          Sign in
        </button>
      </div>
      <div className="container mt-5">
        {data.map((item, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-body">
                <h5 className="card-title">{item.email}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;

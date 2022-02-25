import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import queryClient from "../query";
import client from "../api/index";

const createBook = async ({
  author,
  bookPublishing,
  price,
  image,
  description,
}) => {
  const response = await client.post(`/books`, {
    author,
    bookPublishing,
    price,
    image,
    description,
  });
  return response.data;
};
const deleteBook = async (id) => {
  const response = await client.delete(`/books/${id}`);
  return response.data;
};

const Home = () => {
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const {
    isLoading: fetchLoading,
    error,
    data,
  } = useQuery("libraryData", () => {
    return client.get("/books").then((res) => res.data);
  });

  const {
    mutate,
    isLoading: mutationLoading,
    isError,
  } = useMutation(createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries("libraryData");
    },
  });
  const {
    mutate: deleteMutation,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useMutation(deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries("libraryData");
    },
  });

  if (fetchLoading || mutationLoading || deleteLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return "An error has occurred: ";

  return (
    <div className="container">
      <div className="alert alert-dark mt-5">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Kitap Yazarı"
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          className="form-control mt-3"
          placeholder="Kitap Açıklaması"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          className="form-control mt-3"
          placeholder="Kitap Fiyatı"
        />
        <button
          onClick={() =>
            mutate({
              author,
              description: desc,
              image: "",
              price: price,
              bookPublishing: "2019",
            })
          }
          className="btn btn-light mt-3"
        >
          Ekle
        </button>
      </div>
      <div className="d-flex flex-wrap mt-3 container">
        {data.map((book, index) => (
          <div className="card m-2" key={index}>
            <img src={book.image} className="img-thumbnail" alt={book.author} />
            <div className="card-body">
              <h5 className="card-title">{book.author}</h5>
              <h5 className="card-title">{book.price} Tl</h5>
              <p className="card-text">
                {/* {book.description.substring(0, 30)}... */}
              </p>
              <Link to={`/Detail/${book.id}`}>
                <span className="link-primary">Devamını oku</span>
              </Link>
              <button
                className="btn btn-danger ms-5"
                onClick={() => {
                  deleteMutation(book.id);
                }}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";

function BookShow() {
  const [id, setId] = useState(useParams().id);
  const [book, setBook] = useState({
    title: "",
    author: "",
    content: "",
    genre: "",
  });
  useEffect(() => {
    axios
      .get(`/api/book/${id}`)
      .then(function (response) {
        setBook(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Show Book</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/">
              {" "}
              View All Books
            </Link>
          </div>
          <div className="card-body">
            <b className="text-muted">Title:</b>
            <p>{book.title}</p>
            <b className="text-muted">Author:</b>
            <p>{book.author}</p>
            <b className="text-muted">Content:</b>
            <p>{book.content}</p>
            <b className="text-muted">Genre:</b>
            <p>{book.genre}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookShow;

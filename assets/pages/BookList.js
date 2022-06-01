import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

function BookList() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetchBookList();
  }, []);

  const fetchBookList = () => {
    axios
      .get("/api/book")
      .then(function (response) {
        setBookList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/book/${id}`)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Book deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchBookList();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "An Error Occured!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Symfony Book Manager</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary" to="/create">
              Create New Book
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Content</th>
                  <th>Genre</th>
                  <th width="240px">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookList.map((book, key) => {
                  return (
                    <tr key={key}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.content}</td>
                      <td>{book.genre}</td>
                      <td>
                        <Link
                          to={`/show/${book.id}`}
                          className="btn btn-outline-info mx-1"
                        >
                          Show
                        </Link>
                        <Link
                          className="btn btn-outline-success mx-1"
                          to={`/edit/${book.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="btn btn-outline-danger mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookList;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

function BookEdit() {
  const [id, setId] = useState(useParams().id);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/book/${id}`)
      .then(function (response) {
        let book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "An Error Occured!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    axios
      .patch(`/api/book/${id}`, {
        title: title,
        author: author,
      })
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "book updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "An Error Occured!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Edit book</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/">
              View All books
            </Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  value={title}
                  type="text"
                  className="form-control"
                  id="title"
                  title="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <textarea
                  value={author}
                  onChange={(event) => {
                    setAuthor(event.target.value);
                  }}
                  className="form-control"
                  id="author"
                  rows="3"
                  name="author"
                ></textarea>
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-success mt-3"
              >
                Update book
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookEdit;

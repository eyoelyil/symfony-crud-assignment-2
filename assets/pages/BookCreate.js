import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

function BookCreate() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("genre", genre);

    axios
      .post("/api/book", formData)
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Book saved successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setTitle("");
        setAuthor("");
        setContent("");
        setGenre("");
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
        <h2 className="text-center mt-5 mb-3">Add a new Book</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/">
              View All Bookes
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
                  name="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  onChange={(event) => {
                    setAuthor(event.target.value);
                  }}
                  value={author}
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                  className="form-control"
                  id="content"
                  rows="3"
                  name="content"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input
                  onChange={(event) => {
                    setGenre(event.target.value);
                  }}
                  value={genre}
                  type="text"
                  className="form-control"
                  id="genre"
                  name="genre"
                />
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-primary mt-3"
              >
                Save Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookCreate;

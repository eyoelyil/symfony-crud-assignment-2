import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import BookCreate from "./pages/BookCreate";
import BookEdit from "./pages/BookEdit";
import BookShow from "./pages/BookShow";

function Main() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BookList />} />
        <Route path="/create" element={<BookCreate />} />
        <Route path="/edit/:id" element={<BookEdit />} />
        <Route path="/show/:id" element={<BookShow />} />
      </Routes>
    </Router>
  );
}

export default Main;

if (document.getElementById("app")) {
  ReactDOM.render(<Main />, document.getElementById("app"));
}

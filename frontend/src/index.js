import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//
import "react-grid-layout/css/styles.css";
import "./css/App.css";
import "./css/index.css";
import "./css/scss/custom.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

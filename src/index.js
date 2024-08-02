import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <Toaster
      toastOptions={{
        className: "",
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
          duration:"1000000"
        },
      }}
    />
  </BrowserRouter>
);

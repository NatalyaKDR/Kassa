import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LogIn from "./components/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute isAuthenticated={true}>
            <App />
          </PrivateRoute>
        }
      />

      <Route
        path="/login"
        element={<LogIn />}
      />
      <Route
        path="*"
        element={<h1>Not Found</h1>}
      />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

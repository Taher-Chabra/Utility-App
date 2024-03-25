import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  ErrorPage,
  PasswordGenerator,
  CurrencyConverter,
  TemperatureConverter,
  TodoApp,
} from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "PasswordGenerator",
        element: <PasswordGenerator />,
      },
      {
        path: "CurrencyConverter",
        element: <CurrencyConverter />,
      },
      {
        path: "TemperatureConverter",
        element: <TemperatureConverter />,
      },
      {
        path: "TodoApp",
        element: <TodoApp />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

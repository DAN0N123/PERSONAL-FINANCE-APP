import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//COMPONENT IMPORTS
import Homepage from "./components/homepage/Homepage";
import Error from "./components/Error";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  { path: "/overview", element: <Homepage /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  { path: "*", element: <Error /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

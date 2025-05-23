import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//COMPONENT IMPORTS
import Homepage from "./components/Homepage";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  { path: "*", element: <Error /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

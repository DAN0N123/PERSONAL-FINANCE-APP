import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//COMPONENT IMPORTS
import Homepage from "./components/homepage/Homepage";
import Error from "./components/misc/Error";
import Login from "./components/auth/Login.tsx";
import SignUp from "./components/auth/SignUp";
import Layout from "./components/misc/Layout.tsx";
import TransactionsPage from "./components/transactions/TransactionsPage.tsx";
import UserContextProvider from "./components/misc/UserContext.tsx";
import BudgetsPage from "./components/budgets/BudgetsPage.tsx";
import PotsPage from "./components/pots/PotsPage.tsx";
import BillsPage from "./components/bills/BillsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "overview", element: <Homepage /> },

      { path: "transactions", element: <TransactionsPage /> },
      { path: "budgets", element: <BudgetsPage /> },
      { path: "pots", element: <PotsPage /> },
      { path: "bills", element: <BillsPage /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
  { path: "*", element: <Error /> },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  );
}

export default App;

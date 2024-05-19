/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Menu/Layout.tsx";
import Error from "./pages/Error/Error.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import AuthLayout from "./layout/Auth/AuthLayout.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import User from "./pages/User/User.tsx";
import Transfer from "./pages/Transfer/Transfer.tsx";
import UserTransactions from "./pages/UserTransactions/UserTransactions.tsx";
import StripePayment from "./pages/StripePayment/StripePayment.tsx";
import Withdraw from "./pages/Withdraw/Withdraw.tsx";

const News = lazy(() => import("./pages/News/News"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Menu />,
        errorElement: <>Error</>,
      },
      {
        path: "/payment",
        element: <StripePayment />,
        errorElement: <>Error</>,
      },
      {
        path: "/withdraw",
        element: <Withdraw />,
        errorElement: <>Error</>,
      },
      {
        path: "/news",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <News />
          </Suspense>
        ),
        errorElement: <>Error</>,
      },
      {
        path: "/transafersByUser",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <UserTransactions />
          </Suspense>
        ),
        errorElement: <>Error</>,
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <User />
          </Suspense>
        ),
        errorElement: <>Error</>,
      },
      {
        path: "/transfer",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Transfer />
          </Suspense>
        ),
        errorElement: <>Error</>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

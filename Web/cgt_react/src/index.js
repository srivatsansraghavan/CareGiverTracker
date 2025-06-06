import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./main/RootLayout";
import Main from "./main/Main";
import Home, { firstTimeLogin } from "./home/Home";
import { logoutLoader } from "./shared/MenuBar";
import ErrorPage from "./shared/Error";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "home/:userId",
          element: <Home />,
          loader: firstTimeLogin,
        },
        {
          path: "logout",
          loader: logoutLoader,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

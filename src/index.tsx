import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import reportWebVitals from "reportWebVitals";

import { coinTableLoader } from "logic/loaders/coinList";
import { coinLoader } from "logic/loaders/coin";

import CoinListPage from "components/pages/CoinListPage/CoinListPage";
import CoinPage from "components/pages/CoinPage/CoinPage";
import ErrorPage from "components/pages/ErrorPage/ErrorPage";

import "App.scss";
import "index.scss";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<CoinListPage />}
      errorElement={
        <ErrorPage description="An error occurred on the main page." />
      }
      loader={coinTableLoader}
    ></Route>,
    <Route
      path="cryptocoins/:id"
      element={<CoinPage />}
      errorElement={
        <ErrorPage description="An error occurred on the coin page." />
      }
      loader={coinLoader}
    ></Route>,
  ]),
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div className="app">
      <div className="app__wrapper">
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

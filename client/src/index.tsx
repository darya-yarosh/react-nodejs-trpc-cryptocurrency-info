import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import reportWebVitals from "reportWebVitals";

import CoinsProvider from "providers/coins";
import PortfolioProvider from "providers/portfolio";

import CoinListPage from "pages/CoinListPage/CoinListPage";
import CoinPage from "pages/CoinPage/CoinPage";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import PortfolioPage from "pages/PortfolioPage/PortfolioPage";
import TransactionPage from "pages/TransactionPage/TransactionPage";

import App from "App";

import "App.scss";
import "reset.scss";
import "index.scss";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<CoinListPage />}
      errorElement={
        <ErrorPage description="An error occurred on the main page." />
      }
    >
      <Route
        path="/portfolio"
        element={<PortfolioPage />}
        errorElement={
          <ErrorPage description="An error occurred on the portfolio page." />
        }
      />
    </Route>,
    <Route
      path="cryptocoins/:id"
      element={<CoinPage />}
      errorElement={
        <ErrorPage description="An error occurred on the coin page." />
      }
    />,
    <Route
      path="/purchase/:id?"
      element={<TransactionPage />}
      errorElement={
        <ErrorPage description="An error occurred on the transaction page." />
      }
    />,
  ]),
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div className="app">
      <div className="app__wrapper">
        <PortfolioProvider>
          <CoinsProvider>
            <RouterProvider router={router} />
            <App />
          </CoinsProvider>
        </PortfolioProvider>
      </div>
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

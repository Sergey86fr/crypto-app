import "./App.css";
import {  Spin } from "antd";

import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/layout";
import Portfolio from "./components/portfolio/portfolio";
import CryptoShop from "./components/crypto-shop/crypto-shop";
import AuthLayout from "./components/auth-layout/auth-layout";

function App() {
  // const { loading } = useContext(CryptoContext);

  const route = createBrowserRouter([
    {
      path: '/',
      element: (
      <MainLayout />
      ),
      children: [
        {
          path: '/portfolio',
          element: <Portfolio />
        },
        {
          path: '/',
          element: <CryptoShop />
        }
      ]
    },
    {
      path: 'auth',
      element: <AuthLayout />
    }
  ])

  // if (loading) {
  //   return <Spin fullscreen />;
  // }

  return (
    <Suspense >
      <RouterProvider router={route} />
    </Suspense>
   
  );
}

export default App;

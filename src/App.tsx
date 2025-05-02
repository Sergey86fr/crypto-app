import "./App.css";


import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/layout";
import Portfolio from "./components/portfolio/portfolio";
import CryptoShop from "./components/crypto-shop/crypto-shop";
import AuthLayout from "./components/auth-layout/auth-layout";
import { AuthProvider } from "./context/auth-context";
import { PrivateRoute } from "./private-route/private-route";
import Login from "./components/login/login";

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
          element: (
            <PrivateRoute>
            <Portfolio />
            </PrivateRoute>
          )
        },
        {
          path: '/',
          element: <CryptoShop />
        }
      ]
    },
    {
      path: 'auth',
      element: (<AuthLayout />),
      children:[
        {
          path:'/auth',
          element: <Login />
        }
      ]
    }
  ])

  // if (loading) {
  //   return <Spin fullscreen />;
  // }

  return (
    <AuthProvider>
    <Suspense >
      <RouterProvider router={route} />
    </Suspense>

    </AuthProvider>
   
  );
}

export default App;

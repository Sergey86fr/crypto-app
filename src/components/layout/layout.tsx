import { Layout, Spin } from "antd";
import Header from "../header/header";
import { Outlet } from "react-router-dom";
import CryptoContext from "../../context/crypto-context";
import { useContext } from "react";

function MainLayout() {

  const { loading } = useContext(CryptoContext);

  
  if (loading) {
    return <Spin fullscreen />;
  }


  return (
    <Layout>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
}

export default MainLayout;

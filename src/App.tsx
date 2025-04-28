import "./App.css";
import { Layout, Spin } from "antd";

import { useContext } from "react";
import CryptoContext from "./context/crypto-context";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";

function App() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <Header />
      <Layout>
        <Sidebar />
        <Content />
      </Layout>
    </Layout>
  );
}

export default App;

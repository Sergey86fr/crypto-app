import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../header/header";


function AuthLayout() {
    return (
      <Layout>
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </Layout>
    );
  }
  
  export default AuthLayout;
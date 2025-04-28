import { Layout, Typography } from "antd";
import AssetsTable from "../assets-table/assets-table";
import PortfolioChart from "../portfolio-chart/portfolio-chart";
import CryptoContext from "../../context/crypto-context";
import { useContext } from "react";

const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: "calc(100vh - 60px)",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#001529",
    padding:30
  };
  

function Content() {

    const { crypto, assets} = useContext(CryptoContext);

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price;
        return acc;
      }, {});

    return (
        <Layout.Content style={contentStyle}>
        <Typography.Title
          level={3}
          style={{ textAlign: "left", color: "#fff" }}
        >
          Portfolio price:{" "}
          {assets
            .map((a) => a.amount * cryptoPriceMap[a.id])
            .reduce((acc, v) => (acc += v), 0)
            .toFixed(2)}{" "}
          $
        </Typography.Title>

        <PortfolioChart />
        <AssetsTable />
      </Layout.Content>
    )
}
export default Content
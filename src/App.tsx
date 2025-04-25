import "./App.css";
import {
  Layout,
  Card,
  Statistic,
  List,
  Spin,
  Typography,
  Tag,
  Button,
  Modal,
  Drawer,
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import CryptoContext from "./context/crypto-context";
import CustomSelect from "./components/select";
import CoinInfoModal from "./components/coin-info-modal/coin-info-modal";
import AddCoinForm from "./components/add-coin-form/add-coin-form";
import { ICoin } from "./data.interface";
import AssetsTable from "./components/assets-table/assets-table";
import PortfolioChart from "./components/portfolio-chart/portfolio-chart";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
};

const siderStyle: React.CSSProperties = {
  padding: "10px",
};

function App() {
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState<ICoin | null>(null);
  const [drawer, setDrawer] = useState(false);

  const { loading, assets, crypto } = useContext(CryptoContext);

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc;
  }, {})

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <Layout.Header style={headerStyle}>
        Header
        <CustomSelect setCoin={setCoin} openModal={setModal} />
        <Button onClick={() => setDrawer(true)} type="primary">
          Open
        </Button>
        <Modal
          open={modal}
          onCancel={() => setModal(false)}
          onOk={(modal) => setModal(!modal)}
        >
          <CoinInfoModal coin={coin} />
        </Modal>
        <Drawer destroyOnClose title="Add Coin" onClose={() => setDrawer(false)} open={drawer}>
          <AddCoinForm onClose={() => setDrawer(false)} />
        </Drawer>
      </Layout.Header>
      <Layout>
        <Layout.Sider width="28%" style={siderStyle}>
          {assets.map((asset) => (
            <Card key={asset.id} style={{ marginBottom: "1rem" }}>
              <Statistic
                title={asset.id}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
                prefix={
                  asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="$"
              />
              <List
                size="small"
                dataSource={[
                  {
                    title: "Total Profit",
                    value: asset.totalProfit,
                    withTag: true,
                  },
                  {
                    title: "Asset Amount",
                    value: asset.totalAmount,
                    isPlane: true,
                  },
                  // {title: 'Difference', value: asset.growPercent},
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <span>{item.title}</span>
                    <span>
                      {item.withTag && (
                        <Tag color={asset.grow ? "green" : "red"}>
                          {asset.growPercent} %
                        </Tag>
                      )}
                      {item.isPlane && item.value?.toFixed(2)}
                      {!item.isPlane && (
                        <Typography.Text
                          type={asset.grow ? "success" : "danger"}
                        >
                          {item.value?.toFixed(2)} $
                        </Typography.Text>
                      )}
                    </span>
                  </List.Item>
                )}
              />
            </Card>
          ))}

          {/* <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card> */}
        </Layout.Sider>
        <Layout.Content style={contentStyle}>

<Typography.Title level={3} style={{textAlign:"left", color:"#fff"}} >Portfolio: {assets.map((a)=> 

   a.amount * cryptoPriceMap[a.id]).reduce((acc, v) => (acc += v),0).toFixed(2)
 } $</Typography.Title>

 <PortfolioChart />
 <AssetsTable />

        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;

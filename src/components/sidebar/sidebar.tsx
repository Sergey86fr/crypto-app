import { Card, Layout, List, Statistic, Tag, Typography } from "antd";
import CryptoContext from "../../context/crypto-context";
import { useContext } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const siderStyle: React.CSSProperties = {
    padding: "30px",
  };

function Sidebar() {

    const { assets } = useContext(CryptoContext);

    return(
        <Layout.Sider width="28%" style={siderStyle}>
            <Typography.Title style={{color:"#fff"}} level={2}>Portfolio</Typography.Title>
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
    )
}

export default Sidebar
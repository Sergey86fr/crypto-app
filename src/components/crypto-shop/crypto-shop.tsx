import { Card, Layout, List, Statistic, Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";


function CryptoShop() {
    

        const { crypto } = useContext(CryptoContext);
    
        return(
            <Layout >
                <Typography.Title style={{color:"#fff"}} level={2}>crypto coin</Typography.Title>
            {crypto.map((c) => (
              <Card key={c.id} style={{ marginBottom: "1rem" }}>
                <Statistic
                  title={c.name}
                  value={c.price}
                  precision={2}
                  valueStyle={{ color: c.priceChange1h > c.priceChange1d ? "#3f8600" : "#cf1322" }}
                  prefix={
                    c.priceChange1h > c.priceChange1d ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  suffix="$"
                />
                <List
                  size="small"
                  dataSource={[
                    {
                      title: "Market Cap",
                      value: c.marketCap,
                      withTag: true,
                    },
                    {
                      title: "Volume",
                      value: c.volume,
                      isPlane: true,
                    },
                    // {title: 'Difference', value: asset.growPercent},
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.title}</span>
                      <span>
                        {item.withTag && (
                          <Tag color={c.priceChange1h > c.priceChange1d ? "green" : "red"}>
                            {((c.priceChange1h / c.priceChange1d) * 100).toFixed(2) } %
                          </Tag>
                        )}
                        {item.isPlane && item.value?.toFixed(2)}
                        {!item.isPlane && (
                          <Typography.Text
                            type={c.priceChange1h > c.priceChange1d  ? "success" : "danger"}
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
    
        
          </Layout>
        )
    }
    
   
export default CryptoShop
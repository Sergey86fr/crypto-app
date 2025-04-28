import { useState } from "react";
import { ICoin } from "../../data.interface";
import { Button, Drawer, Layout, Modal } from "antd";
import CustomSelect from "../select/select";
import CoinInfoModal from "../coin-info-modal/coin-info-modal";
import AddCoinForm from "../add-coin-form/add-coin-form";



const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    height: 60,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
    padding:30
  };


function Header() {
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState<ICoin | null>(null);
    const [drawer, setDrawer] = useState(false);
  


    return (
        <Layout.Header style={headerStyle}>
        <CustomSelect   setCoin={setCoin} openModal={setModal} />
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
        <Drawer
          destroyOnClose
          title="Add Coin"
          onClose={() => setDrawer(false)}
          open={drawer}
        >
          <AddCoinForm onClose={() => setDrawer(false)} />
        </Drawer>
      </Layout.Header>
    )
}

export default Header
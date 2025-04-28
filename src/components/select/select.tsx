import { Select, Space } from "antd"
import { FC, useContext, useState } from "react"
import CryptoContext from "../../context/crypto-context";


interface CustomSelectProps {
    openModal: (val: boolean) => void;
    setCoin: () => void;
  }

const CustomSelect:FC<CustomSelectProps> = ({openModal, setCoin}) => {

    // const [select, setSelect] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
   const {crypto} =  useContext(CryptoContext)

//    useEffect(() => {
//     const keypress = (event: { key: string }) => {
//      if (event.key === '/') {
//         setSelect((prev) =>!prev)
//      }
//     }
//       document.addEventListener('keypress', keypress)
//       return () => document.removeEventListener('keypress', keypress)
//    },[])

     function handleSelect(value: string) {
      setCoin(crypto.find((c) => c.id === value ))
        setSelectedValue(value);
        openModal(true)
       
     }
      
    return (
        <Select
    style={{ width:"300px" }}
    onSelect={handleSelect}
    // onClick={()=> setSelect((prev) => !prev)}
    value= {selectedValue ? selectedValue : 'press / to open'}
    options={crypto.map((coin) => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon,
    }))}
    optionRender={(option) => (
      <Space>
         <img style={{width:15}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
      </Space>
    )}
  />
    )
}

export default CustomSelect
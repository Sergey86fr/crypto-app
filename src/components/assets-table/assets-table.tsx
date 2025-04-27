import { Table, TableColumnsType } from "antd";
import CryptoContext from "../../context/crypto-context";
import { useContext } from "react";



interface DataType {
    key: string;
    name: string;
    price: number;
    amount: number;
  }
  
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => (a.name.localeCompare(b.name)),
      sortDirections: ['descend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
  ];
  
  

function AssetsTable(){
const { assets} = useContext(CryptoContext)
// console.log(assets);
const data = assets.map((a) => ({
  key: a.id,
  name: a.name,
  price: a.price,
  amount: a.amount,
}))

      
      // const onChange: TableProps<DataType>['onChange'] = (pagination, sorter, extra) => {
      //   console.log('params', pagination, sorter, extra);
      // };


    return (
        <div>
             <Table<DataType>
                pagination={false}
    columns={columns}
    dataSource={data}
    // onChange={onChange}
    showSorterTooltip={{ target: 'sorter-icon' }}
  />
        </div>
    )
}
export default AssetsTable;
import { Button, DatePicker, Divider, Flex, Form,  InputNumber, Result, Select, Space, Typography } from "antd"
import {  useContext, useRef, useState } from "react"
import CryptoContext from "../../context/crypto-context"


type FieldType = {
    amount?: number;
    price?: number;
    date: number;
    total?: number;
  };
  
  // const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  //   console.log('Success:', values);
  // };
  
  // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  const validateMessages = {
    required: '${label} is required',
    types: {
      number: '${label} in not valid number',
    },
    number: '${label} must be betwwen ${min} and ${max}',
  }

function AddCoinForm({onClose}) {
  const[ form ] = Form.useForm()
    const [coin, setCoin] = useState(null)
    const {crypto, addAsset} = useContext(CryptoContext)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef(null)
   

    // console.log(form);
    
  if(submitted) {
    return (
      <Result
      status="success"
      title="New Asset Added!"
      subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
      extra={[
        <Button type="primary" key="console" onClick={onClose}>
          Close
        </Button>,
      ]}
      />
    )
  }



    if(!coin) {

        return (
              <Select
              style={{width:'100%'}}
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        placeholder="Select coin"
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


  function onFinish(values) {
    console.log(values);
    
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    // console.log(newAsset);
    
    assetRef.current =  newAsset
    setSubmitted(true)
    addAsset(newAsset)
    // addAsset(newAsset)
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue('price')
      form.setFieldValue(
        'total', (value * price).toFixed(2),
      )
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount')
      form.setFieldValue(
        'total', (amount * value).toFixed(2),
      )
  }

    return (
         <Form
         form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ price: +coin.price.toFixed(2) }}
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    // autoComplete="off"
    validateMessages={validateMessages}
    onFinish={onFinish}
    
  >
        <Flex align="center">
            <img src={coin.icon} alt={coin.name}  style={{width: 40, marginRight:10}}/>
            <Typography.Title style={{margin:0}} level={2}>{coin.name}</Typography.Title>
        </Flex>
        <Divider />

       
    <Form.Item<FieldType>
      label="Amount"
      name="amount"
      rules={[{type:'number',min:0, required: true,  }]}
    >
      <InputNumber onChange={handleAmountChange} placeholder="Enter coin amount" style={{width:'100%'}} />
    </Form.Item>

    <Form.Item<FieldType>
      label="Price"
      name="price"
    >
      <InputNumber onChange={handlePriceChange} style={{width:'100%'}} />
    </Form.Item>

    <Form.Item<FieldType>
      label="Date & Time"
      name="date"
    >
      <DatePicker showTime />
    </Form.Item>

    <Form.Item<FieldType>
      label="Total"
      name="total"
    >
      <InputNumber disabled style={{width:'100%'}} />
    </Form.Item>

    

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" >
        Add Asset
      </Button>
    </Form.Item>
  </Form>
    )
}

export default AddCoinForm
import React from 'react'
import {Button, Divider, Form, Input, InputNumber, Modal, Space} from "antd";

const PurchaseForm = ({onSubmit}) => {

    return (
        <div>
            <Form labelAlign={"left"} layout={"vertical"} size={"large"}
                  onFinish={onSubmit}>
                <Form.Item name={'amount'} required label={"Address"} rules={[{type: 'string', required: true,message: "Input address"}]}>
                    <InputNumber style={{width: 300}} defaultValue={3}/>
                </Form.Item>
                {/*<Form.Item name={'recipient'} required label={"Nhập public key của người nhận"} rules={[{type: 'string', required: true, message: "Bổ sung public key người nhận"}]}>*/}
                {/*    <Input/>*/}
                {/*</Form.Item>*/}
                <Form.Item>
                    <Button type="primary" size={"large"} htmlType={"submit"}>Buy license</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PurchaseForm;

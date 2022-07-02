import React from 'react'
import {Button, Form, Input} from "antd";

const PurchaseForm = ({onSubmit, buttonText}) => {

    return (
        <div>
            <Form labelAlign={"left"} size={"large"}
                  onFinish={onSubmit}>
                <Form.Item name={'address'} required label={"Address"} rules={[{type: 'string', required: true,message: "Input address"}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>
                {/*<Form.Item name={'recipient'} required label={"Nhập public key của người nhận"} rules={[{type: 'string', required: true, message: "Bổ sung public key người nhận"}]}>*/}
                {/*    <Input/>*/}
                {/*</Form.Item>*/}
                <Form.Item>
                    <Button type="primary" size={"large"} htmlType={"submit"}>{buttonText || "Buy license"}</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PurchaseForm;

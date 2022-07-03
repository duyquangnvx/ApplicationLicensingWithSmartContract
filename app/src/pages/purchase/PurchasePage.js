import React from 'react'
import PurchaseForm from "./PurchaseForm";
import {buyLicense} from "../../services/api";
import {Button, Col, Divider} from "antd";
import {getAddressFromMetaMask} from "../../util/utils";

const PurchasePage = ({}) => {

    const onPurchase = async (formData) => {
        try {
            const result = await buyLicense(formData)
            console.log('result', result)
        } catch (err) {
            console.log(err)
        }
    }

    const buyByMetaMask = () => {
        getAddressFromMetaMask(async (address) => {
            const result = await buyLicense({address})
            console.log('getAddressFromMetaMask result', result)
        })
    }

    return (
        <Col offset={2} span={20}>
            <h1 style={{marginTop: 20}}>Blockchain-based Smart-Contracts Application Licensing</h1>
            <Divider/>
            <h2>Buy license</h2>
            <Col span={12}>
                {/*<Divider/>*/}
                {/*<h3>Buy via your text address</h3>*/}
                {/*<Col span={24}>*/}
                {/*    <PurchaseForm onsonPurchase={onPurchase}/>*/}
                {/*</Col>*/}
                {/*<Divider/>*/}
                {/*<h3>If you have MetaMask</h3>*/}
                <Col span={12}>
                    <Button type="primary" size={"large"} onClick={buyByMetaMask}>Buy license via MetaMask</Button>
                </Col>
            </Col>
        </Col>
    )
}

export default PurchasePage;

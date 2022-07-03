import React, {useState} from 'react'
import {buyLicense} from "../../services/api";
import {Button, Col, Divider, message} from "antd";
import {getAddressFromMetaMask, handleWeb3Result, showError, showMessage} from "../../util/utils";
import {useNavigate} from "react-router-dom";

const PurchasePage = ({}) => {
    const navigate = useNavigate()
    const [buyLoading, setBuyLoading] = useState(false)
    const onBuySuccess = (result) => {
        try {
            handleWeb3Result(result);
            message.success("Buy successfully", 5000)
            navigate('/licenses')
        } catch (err) {
            showError(err)
        }
    }


    const onPurchase = async (formData) => {
        try {
            const result = await buyLicense(formData)
            const {error, data} = result;
            if (error !== 0) {
                onBuySuccess(result);
            } else {
                const {error: {reason}} = error;
                showMessage(reason)
            }
            console.log('result', result)
        } catch (err) {
            showError(err);
        }
    }

    const buyByMetaMask = async () => {
        try {
            setBuyLoading(true)
            const address = await getAddressFromMetaMask()
            const result = await buyLicense({address})
            onBuySuccess(result);
            console.log('getAddressFromMetaMask result', result)
        } catch (err) {
            showError(err);
        }

        setBuyLoading(false)
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
                    <Button loading={buyLoading} type="primary" size={"large"} onClick={buyByMetaMask}>Buy license via MetaMask</Button>
                </Col>
            </Col>
            <Divider/>
            <h2>Or check if you have any license</h2>
            <Col span={12}>
                <Col span={12}>
                    <Button type="primary" size={"large"} onClick={() => navigate("/licenses")}>Check licenses</Button>
                </Col>
            </Col>
        </Col>
    )
}

export default PurchasePage;

import React, {useEffect, useState} from 'react'
import {buyLicense, getLicensesOfAddress} from "../../services/api";
import {getAddressFromMetaMask} from "../../util/utils";
import {Button, Col, Divider, Table} from "antd";
import PurchaseForm from "../purchase/PurchaseForm";

const LicenseMangePage = ({}) => {

    const [licenses, setLicenses] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getByMetaMask()
    }, [])

    const dataSource = licenses.map((l, index) => ({key: index, ...l,}));
    const columns = [{
        title: "Token",
        dataIndex: 'tokenId'
    }]

    const getLicenses = async (formData) => {
        try {
            const result = await getLicensesOfAddress(formData)
            console.log('getLicensesOfAddress result', result)
        } catch (err) {
            console.log(err)
        }
    }

    const getByMetaMask = () => {
        getAddressFromMetaMask(async (address) => {
            const result = await getLicensesOfAddress({address})
            setLicenses(result)
            console.log('getLicensesOfAddress result', result)
        })
    }

    if (loading) {
        return <span>Loading...</span>
    }

    return (
        <Col offset={2} span={20}>
            <h1 style={{marginTop: 20}}>Your licenses</h1>
            <Divider/>
            {/*<h3>Input your address manually</h3>*/}
            {/*<Col span={12}>*/}
            {/*    <PurchaseForm onSubmit={getLicenses} buttonText={"Submit"}/>*/}
            {/*</Col>*/}
            {/*<Divider/>*/}
            {/*<h3>If you have MetaMask</h3>*/}
            {/*<Col span={12}>*/}
            {/*    <Button type="primary" size={"large"} onClick={getByMetaMask}>Connect via MetaMask</Button>*/}
            {/*</Col>*/}
            {/*<Divider/>*/}
            <h3>List token of address</h3>
            <Col span={24}>
                <Table dataSource={dataSource} columns={columns} pagination={{hideOnSinglePage: true}}/>
            </Col>
        </Col>
    )
}

export default LicenseMangePage;

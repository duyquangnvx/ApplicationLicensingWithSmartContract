import React, {useEffect, useState} from 'react'
import {activateLicense, getLicensesOfAddress} from "../../services/api";
import {getAddressFromMetaMask, handleWeb3Result, showError, showMessage} from "../../util/utils";
import {Button, Col, Divider, Space, Table, Tooltip} from "antd";
import moment from "moment";

const LicenseMangePage = ({}) => {

    const [licenses, setLicenses] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getByMetaMask()
    }, [])

    const onActivateLicense = async (item) => {
        try {
            const {tokenId} = item;
            const address = await getAddressFromMetaMask();
            const result = await activateLicense({address, tokenId})
            const data = handleWeb3Result(result);
            localStorage.setItem("tokenId", tokenId)
            showMessage("Active successfully!");
        } catch (err) {
            showError(err);
        }
    }

    const dataSource = licenses.map((l, index) => ({key: index, ...l,}));
    const columns = [{
        title: "Token Id",
        dataIndex: 'tokenId'
    }, {
        title: "License State",
        dataIndex: 'licenseState'
    }, {
        title: "Expires On",
        dataIndex: 'expiresOn'
    }, {
        title: "License State",
        dataIndex: 'licenseState'
    }, {
        title: "Registered On",
        dataIndex: 'registeredOn',
        render: (value) => <span>{moment(value * 1000).format("DD-MM-YYYY HH:mm:ss")}</span>
    },
        {
            key: "action",
            width: 160,
            render: (item, index) => (
                <Space size="middle" key={index}>
                    <Tooltip placement="bottom" title={"Activate"}>
                        <Button
                            type="primary"
                            onClick={() => {
                                onActivateLicense(item)
                            }}
                        >Active</Button>
                    </Tooltip>
                </Space>
            ),
        },
    ]

    const getLicenses = async (formData) => {
        try {
            const result = await getLicensesOfAddress(formData)
            console.log('getLicensesOfAddress result', result)
        } catch (err) {
            console.log(err)
        }
    }

    const getByMetaMask = async () => {
        const address = await getAddressFromMetaMask();
        const result = await getLicensesOfAddress({address})
        const data = handleWeb3Result(result);
        setLicenses(data.tokens)
        console.log('getLicensesOfAddress result', data.tokens)
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

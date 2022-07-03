import React, {useEffect, useState} from 'react'
import {activateLicense, getLicensesOfAddress} from "../../services/api";
import {getAddressFromMetaMask, getDeviceId, handleWeb3Result, showError, showMessage} from "../../util/utils";
import {Button, Col, Divider, Row, Space, Table, Tooltip} from "antd";
import moment from "moment";
import {Link, useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

const LicenseMangePage = ({}) => {
    const navigate = useNavigate()

    const [licenses, setLicenses] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getByMetaMask().then(r => setLoading(false))
    }, [])

    const onActivateLicense = async (item) => {
        try {
            const {tokenId} = item;
            const address = await getAddressFromMetaMask();
            const result = await activateLicense({address, tokenId, deviceId: getDeviceId()})
            const data = handleWeb3Result(result);
            localStorage.setItem("tokenId", tokenId)
            showMessage("Active successfully!");
            navigate("/")
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
        dataIndex: 'expiresOn',
        render: (value) => value > 0 ?
            <span>{moment(value * 1000).format("DD-MM-YYYY HH:mm:ss")}</span> : 'Not active'
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
            render: (item, index) => {
                switch (item.licenseState) {
                    case 0:
                    case "0":
                        return <span>Activated</span>
                    case 1:
                    case "1":
                        return <Space size="middle" key={index}>
                            <Tooltip placement="bottom" title={"Activate"}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        onActivateLicense(item)
                                    }}
                                >Active</Button>
                            </Tooltip>
                        </Space>
                    default:
                        return "Expired"
                }
            },
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
        return <Spinner/>;
    }

    return (
        <Col offset={2} span={20}>
            <div style={{marginTop: 20}}>
                <h1 style={{margin: 0}}>Your licenses</h1>
                <Link to={'/'}>
                    <p>Go home</p>
                </Link>
            </div>
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

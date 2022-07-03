import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {checkLicenseIsActive} from "../../services/api";
import {showError} from "../../util/utils";
import {Col} from "antd";

const HomePage = ({}) => {
    const navigate = useNavigate()

    const [license, setLicense] = useState({})
// const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    // const ethereum = web3.eth;
    const tokenId = localStorage.getItem("tokenId");
    const address = localStorage.getItem("address");
    const deviceId = "some_device_id";

    useEffect(() => {
        // check license with account
        if (address && tokenId) {
            checkLicenseIsActive({tokenId, address}).then(result => {
                alert("license is activated")
            }).catch(err => showError(err));
        } else {
            navigate('/purchase')
        }
    }, [address, tokenId])

    return (
        <Col offset={2} span={20}>
            <h1>Your license is valid!</h1>
        </Col>
    )
}

export default HomePage;

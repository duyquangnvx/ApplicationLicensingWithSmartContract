import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {checkLicenseIsActive} from "../../services/api";
import {getAddressFromMetaMask, showError} from "../../util/utils";
import {Col, message} from "antd";
import Web3Util from "../../util/web3-util";

const HomePage = ({}) => {
    const navigate = useNavigate()

    const [license, setLicense] = useState({})
// const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    // const ethereum = web3.eth;
    const tokenId = localStorage.getItem("tokenId");
    const deviceId = "some_device_id";

    useEffect(() => {
        // check license with account
        loadData()

    }, [])

    const loadData = async () => {
        console.log(tokenId)
        const address = await getAddressFromMetaMask();
        console.log('address new', address)
        console.log('tokenId', tokenId)
        if (address && tokenId) {
            checkLicenseIsActive({tokenId, address}).then(result => {
                const {
                    error,
                    data = {}
                } = result;
                if (error !== 0) {
                    const {error: {reason = 'Error occur'}} = data;
                    alert(reason);
                } else {
                    const {licenseState} = data;
                    if (licenseState == 1) {
                        message.warn("Your license is not activated")
                        navigate('/licenses')
                    } else if (licenseState == 2) {
                        message.warn("Your license is expired")
                        navigate('/purchase')
                    }
                    // alert("License is valid")
                }
            }).catch(err => showError(err));
        } else {
            navigate('/purchase')
        }
    }

    return (
        <Col offset={2} span={20}>
            <h1>Your license is valid!</h1>
        </Col>
    )
}

export default HomePage;

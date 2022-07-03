import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {checkLicenseIsActive, getLicensesOfAddress} from "../../services/api";
import {getAddressFromMetaMask, handleWeb3Result, showError} from "../../util/utils";
import {Col, message} from "antd";

const HomePage = ({}) => {
    const navigate = useNavigate()

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
        } else if (address) {
            // check address has any token not expire
            const result = await getLicensesOfAddress()
            const data = handleWeb3Result(result, true);
            const {tokens = []} = data;
            let anyToken = tokens.find(t => t.licenseState !== 2);
            if (anyToken != null) {
                navigate('/licenses')
            } else {
                message.warn("Your address does not have any license valid! Activate one")
                navigate('/purchase')
            }
        } else {
            message.warn("Your address does not have any license!")
            navigate('/purchase')
        }
    }

    return (
        <Col offset={2} span={20}>
            <h1 style={{marginTop: 20}}>Wellcome to my application!</h1>
        </Col>
    )
}

export default HomePage;

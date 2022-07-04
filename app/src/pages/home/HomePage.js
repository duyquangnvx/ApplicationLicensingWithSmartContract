import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {checkLicenseIsActive, getLicensesOfAddress} from "../../services/api";
import {getAddressFromMetaMask, handleWeb3Result, showError, showMessage} from "../../util/utils";
import {Col, message} from "antd";
import Spinner from "../../components/spinner/Spinner";

const HomePage = ({}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const tokenId = localStorage.getItem("tokenId");
    useEffect(() => {
        // check license with account
        loadData().then(r => setLoading(false))
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
                    localStorage.removeItem("tokenId")
                    const {error: {reason = 'Not found license!'}} = data;
                    // message.warn(reason);
                    checkAnyValidToken(address)
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
            checkAnyValidToken(address);
        } else {
            message.warn("Your address does not have any license!")
            navigate('/purchase')
        }
    }

    const checkAnyValidToken = async (address) => {
        const result = await getLicensesOfAddress({address})
        const data = handleWeb3Result(result, true);
        const {tokens = []} = data;
        let anyToken = tokens.find(t => t.licenseState !== 2);
        if (anyToken != null) {
            localStorage.setItem("tokenId", anyToken.tokenId);
        } else {
            message.warn("Your address does not have any license valid! Activate one")
            navigate('/purchase')
        }
    }

    if (loading) {
        return <Spinner text={'Checking license...'}/>
    }

    return (
        <Col offset={2} span={20}>
            <h1 style={{marginTop: 20}}>Wellcome to my application!</h1>
            <Link to={'/licenses'}>
                <p>View licenses</p>
            </Link>
        </Col>
    )
}

export default HomePage;

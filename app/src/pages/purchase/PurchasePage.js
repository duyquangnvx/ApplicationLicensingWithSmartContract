import React from 'react'
import PurchaseForm from "./PurchaseForm";
import {buyLicense} from "../../services/api";
import {message} from "antd";

const PurchasePage = ({}) => {

    const onPurchase = async (formData) => {
        try {
            const result = await buyLicense(formData)
            console.log('result', result)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Buy license</h2>
            <PurchaseForm/>
        </div>
    )
}

export default PurchasePage;

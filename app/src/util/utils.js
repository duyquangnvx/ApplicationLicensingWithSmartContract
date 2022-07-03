import {message, message as antMessage} from "antd";
import {v4} from 'uuid'

export const getResponseErrorMessage = (err) => {
    if (err.response) {
        const message = err.response?.data.message || "An error occur";

        if (typeof message !== "string") {
            return JSON.stringify(message);
        } else {
            return message;
        }
    }
    return err.message || "An error occur";
};
export const showError = (err, func) => {
    const displayFunc = func ?? antMessage.error;
    displayFunc(getResponseErrorMessage(err));
};

export const showMessage = (message) => {
    antMessage.success(message);
};

export const getAddressFromMetaMask = async () => {
    console.log('gọi hàm')

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        return accounts[0]
    }

}

export const handleWeb3Result = (result, show = false) => {
    const {data, error} = result;
    if (error !== 0) {
        const {error: {reason = 'Error occur'}} = data;
        if (show) {
            message.error(reason);
        }
        throw new Error(reason);
    } else {
        return data;
    }
}

export const getDeviceId = () => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
        localStorage.setItem("deviceId", v4())
    }

    return localStorage.getItem("deviceId")
}

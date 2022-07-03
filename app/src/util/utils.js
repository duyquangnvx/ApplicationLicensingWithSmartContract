import {message as antMessage} from "antd";
import Web3Util from "./web3-util";

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

export const getAddressFromMetaMask = (callback) => {
    console.log('gọi hàm')
    
    let account = Web3Util.getCurrentAccount();
    callback(account);

}




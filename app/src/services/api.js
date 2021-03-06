import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000';
const http = axios.create({baseURL: API_BASE_URL});

const PATH = '/license'
export const buyLicense = async (body) => {
    const {data} = await http.post(`${PATH}/buy`, body);
    console.log('-------buyLicense', data);
    return data;
}

export const activateLicense = async (body) => {
    const {data} = await http.post(`${PATH}/activate`, body);
    return data;
}

export const renewalLicense = async (body) => {
    const {data} = await http.post(`${PATH}/renewal`, body);
    return data;
}

export const checkLicenseIsActive = async (body) => {
    const {data} = await http.post(`${PATH}/check-active`, body);
    return data;
}


export const getLicenseInfo = async (body) => {
    const {data} = await http.post(`${PATH}/license-info`, body);
    return data;
}


export const getLicensesOfAddress = async (body) => {
    const {data} = await http.post(`${PATH}/tokens-of-account`, body);
    return data;
}

import { App_Constant } from '../config/appConfig';
const axios = require('axios');

export async function apiPost(apiUrl, jsonBody ) {
    const axiosInstance = axios.create({
        baseURL: `${App_Constant.APIURL}/${App_Constant.prefix}`,
    });
    
    let apiResponse = await axiosInstance.post(apiUrl, jsonBody);
   
    return apiResponse;
}

export async function apiGet(apiUrl) {
    const axiosInstance = axios.create({
        baseURL: `${App_Constant.APIURL}/${App_Constant.prefix}`,
    });
    let apiResponse = await axiosInstance.get(apiUrl).catch(function (error) {
        // handle error
        return error;
    });
    return apiResponse;
}
export async function apiPut(apiUrl, userDataValue) {
    const axiosInstance = axios.create({
        baseURL: `${App_Constant.APIURL}/${App_Constant.prefix}`,
    });
    let apiResponse = await axiosInstance.put(apiUrl, userDataValue).catch(function (error) {
        // handle error
        return error;
    });
    return apiResponse;
}
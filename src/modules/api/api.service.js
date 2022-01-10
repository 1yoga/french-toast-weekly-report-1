import axios from 'axios';
// import {addRequest, authError, removeRequest, requestError} from "./api.store";

export const api = axios.create({
    timeout: 30000,
    headers: { Accept: "application/json"},
    // baseURL: 'https://localhost:5001/api/'
    baseURL: 'https://weekly-report-01.digitalocean.ankocorp.com/api/'
})






// function errorInterceptor(error) {
//     if (!error.response) return Promise.reject(error);
//     switch(error.response.status) {
//         case 401:
//             authError();
//             break;
//         default:
//             requestError(error.response);
//             break;
//     }
//     if (error.response.config && error.response.config.requestId) {
//         removeRequest(error.response.config.requestId);
//     }
//     return Promise.reject(error);
// }

// function responseInterceptor(res) {
//     if (res.config && res.config.requestId) {
//         removeRequest(res.config.requestId);
//     }
//     return res;
// }

// function expirationInterceptor(res) {
//     let expiration;
//     if (res.headers) {
//         expiration = res.headers["expiration-time"];
//     }
//     localStorage.setItem("expiration", JSON.stringify({expiration, changed: Date.now()}));
//     return res;
// }

// api.interceptors.response.use(responseInterceptor, errorInterceptor);
// api.interceptors.response.use(expirationInterceptor);

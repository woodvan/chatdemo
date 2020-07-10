import axios from "axios";
import {LocalStorageUtils} from "../utils";

// Add a request interceptor
axios.interceptors.request.use(
   config => {
        const token = LocalStorageUtils.loadState('token')
        if (token) {
            config.headers['Authorization'] = 'Token ' + token;
        }
       return config;
   },
   error => {
       Promise.reject(error)
});

export default axios;
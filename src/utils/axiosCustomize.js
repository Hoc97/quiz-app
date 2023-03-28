import axios from 'axios';
import NProgress from 'nprogress';
import { store } from '../redux/store';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});
const instance = axios.create({
    baseURL: 'http://localhost:8081',
});
// Add a request interceptor

instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // console.log('get state store>>', store.getState().userManage.account.access_token);
        const access_token = store?.getState()?.userManage?.account?.access_token;
        // console.log('access_token', access_token);
        config.headers['Authorization'] = 'Bearer ' + access_token;
        NProgress.start();
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response?.data ? response.data : response;
    },
    function (error) {
        NProgress.done();
        //token expired: EC === -999
        if (error?.response?.data?.EC === -999) {
            window.location.href = '/login';
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error?.response?.data ? error.response.data : Promise.reject(error);
    }
);

export default instance;

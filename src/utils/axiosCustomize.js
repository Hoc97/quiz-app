import axios from 'axios';
import NProgress from 'nprogress';
import { store } from '../redux/store';
import { toast } from 'react-toastify';
import { refreshAccessToken } from '../services/apiService';


const { dispatch } = store;
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
        const access_token = store?.getState()?.accountManage?.account?.access_token;
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
    async function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response?.data ? response.data : response;
    },
    async function (error) {
        NProgress.done();
        //token expired: EC === -999
        if (error?.response?.data?.EC === -999) {
            // window.location.href = '/login';  //c1
            toast.error('Token hết hạn');
            const email = store?.getState()?.accountManage?.account?.email;
            const refresh_token = store?.getState()?.accountManage?.account?.refresh_token;
            const data = await refreshAccessToken(email, refresh_token);
            console.log('data', data);
            if (data.EC === 0) {
                error.config.headers['Authorization'] = 'Bearer ' + data?.DT.access_token;
                dispatch({ type: 'REFRESH_TOKEN', payload: data?.DT });
            }
            return instance(error?.config);
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error?.response?.data ? error.response.data : Promise.reject(error);
    }
);

export default instance;

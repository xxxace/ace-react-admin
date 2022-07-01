import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Message, Modal } from "@arco-design/web-react";
import { getToken } from '@/utils/auth';

axios.defaults.baseURL = 'http://localhost:1337/api';

axios.interceptors.request.use(function onFulfilled(config: AxiosRequestConfig) {
    const token = getToken();

    if (token) {
        if (!config.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function onReject(error) {
    return Promise.reject(error)
});


axios.interceptors.response.use(function onFulfilled(response: AxiosResponse) {
    const res = response.data;

    if (!res.code) res.code = response.status;
    if (res.code !== 200) {
        let errorMsg = '响应失败';

        if (res.code === 401 && response.config.url !== '/api/auth/local') {
            Modal.warning({
                title: '登出确认',
                content: '登录超时,点击确认重新登录。',
                okText: '确认',
                async onOk() {

                    window.location.reload();
                }
            })
        }

        if (res.code === 500 && res.message) {
            errorMsg = res.message || res.msg;
        }

        Message.error({
            content: errorMsg,
            duration: 5 * 1000
        });

        return Promise.reject(new Error(errorMsg));
    }

    return Promise.resolve(res);
}, function onReject(error) {
    Message.error({
        content: error.msg || error.message || '响应错误',
        duration: 5 * 1000
    });

    return Promise.reject(error)
});
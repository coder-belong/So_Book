import axios from 'axios'

// 封装axios
function myaxios(option) {
    // 1. 创建axios实例
    const instance = axios.create({
        baseURL: 'http://localhost:8888',
        timeout: 999999
    })

    // 请求拦截器
    instance.interceptors.request.use(function (config) {
        return config;
    });

    // 响应拦截器
    instance.interceptors.response.use(response => {
        return response.data
    });

    return instance(option)
}


export default myaxios
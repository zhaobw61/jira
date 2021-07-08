import { useAuth } from './../context/auth-context';
import qs from 'qs'
import * as auth from '../auth-provider'

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string,
    data?: object
}
export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig // 如果声明method 就会覆盖默认值 GET
    }

    if(config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    // fetch 在服务端有异常的时候不会抛出异常
    // axios 会抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
        // 未登录  token 失效
        if(response.status === 401) {
            await auth.logout()
            window.location.reload();
            return Promise.reject({message: '请重新登录'})
        }
        const data = await response.json();
        if(response.ok) {
            return data;
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp  = () => {
    const {user} = useAuth();
    // ToDo 讲解TS操作符
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { refreshTokenApi } from './auth'
export const timeout = 50000
//刷新token接口
export const refreshApi = axios.create({
    baseURL: '/api/v1',
    timeout,
})
refreshApi.interceptors.response.use(res => {
    return res.data
}, async error => {
    return Promise.reject(error)
})
//server服务器接口
export const serverApi = axios.create({
    baseURL: '/api/v1',
    timeout,
})
//存储失败的请求
let requestQueue: ((newAccessToken: string) => void)[] = [] //存储失败的请求
let isRefreshing = false //是否正在刷新token
//请求拦截器
serverApi.interceptors.request.use(config => {
    const userStore = useUserStore()
    if (userStore.getAccessToken) {
        config.headers.Authorization = `Bearer ${userStore.getAccessToken}`
    }
    return config
})
//响应拦截器
serverApi.interceptors.response.use(res => {
    return res.data
}, async error => {
    //1.非token过期错误,则直接返回错误
    if (error.response.status !== 401) {
        return Promise.reject(error)
    }
    const userStore = useUserStore()
    const accessToken = userStore.getAccessToken //读取accessToken
    const refreshToken = userStore.getRefreshToken //读取refreshToken
    const originalRequest = error.config //读取原始请求
    //2.如果token被清空,则退出登录
    if (!accessToken || !refreshToken) {
        userStore.logout() //如果token被清空,则退出登录
        router.replace('/') //如果token被清空,则跳转到到首页
        return Promise.reject(error)
    }
    //3.如果正在刷新token,则将请求存储到队列中,等待token刷新后重新请求
    if (isRefreshing) {
        return new Promise((resolve) => {
            requestQueue.push((newAccessToken: string) => {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                resolve(serverApi(originalRequest))
            })
        })
    }
    //4.开始刷新token
    isRefreshing = true
    try {
        const newToken = await refreshTokenApi({ refreshToken: refreshToken })
        if (newToken.success) {
            userStore.updateToken(newToken.data) //更新token
        } else {
            console.log('asasddsda')
            userStore.logout() //如果token被清空,则退出登录
            router.replace('/') //如果token被清空,则跳转到到首页
            return Promise.reject(error)
        }
        //5.发送存储的请求
        const newAccessToken = newToken.data.accessToken
        requestQueue.forEach(callback => callback(newAccessToken))
        return serverApi(originalRequest)
    }
    catch (error) {
        console.log(error)
        return Promise.reject(error)
    } finally {
        requestQueue = [] //清空队列
        isRefreshing = false //重置刷新状态
    }
})
//----------------------------AI------------------------------------------------
//ai服务器接口
export const aiApi = axios.create({
    baseURL: '/api/ai/v1',
    timeout,
})

aiApi.interceptors.response.use(res => {
    return res.data
})


export interface Response<T = any> {
    timestamp: string,
    path: string,
    message: string,
    code: number,
    success: boolean,
    data: T
}
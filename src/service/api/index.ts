import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { showMessage } from '@/components/MessageManager';
interface IResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
}

export interface IQueryList<T> {
    itemList: T;
}

export interface IRequestConfig extends AxiosRequestConfig {
    toastError?: boolean;
}

const axiosInstance = axios.create({
    baseURL: '/api'
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig & IRequestConfig) => {
    try {
        if (config.url === '/user/login' || config.url === '/user/register' || config.url === '/song/list') {
            return config;
        } else {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('请先登录');
                showMessage({ type: 'warning', message: '请先登录' });
                return Promise.reject('请先登录');
            } else {
                config.headers.Authorization = token;
                return config;
            }
        }
    } catch (e: any) {
        console.error(e);
        showMessage({ type: 'error', message: e.message });
        return Promise.reject(e);
    }
});

axiosInstance.interceptors.response.use(async (response: AxiosResponse<IResponse, any>) => {
    try {
        const { data } = response;
        if (data.success) {
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return response;
        } else {
            showMessage({ type: 'error', message: data.message });
            return Promise.reject(data.message);
        }
    } catch (e: any) {
        console.error(e);
        showMessage({ type: 'error', message: e.message });
        return Promise.reject(e);
    }
});

async function Request<T = any>(params: IRequestConfig, extraConfig?: IRequestConfig): Promise<IResponse<T>> {
    try {
        const Response = await axiosInstance.request<IResponse<T>>({ ...extraConfig, ...params });
        return Response.data;
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
}
export default Request;

import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
interface IResponse<T = any> {
    success: boolean,
    message: string,
    data?: T,
    token?: string
}
export interface IRequestConfig extends AxiosRequestConfig {
    toastError?: boolean,
}


const axiosInstance = axios.create({
    baseURL: '/api'
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig & IRequestConfig) => {
    try {
        return config;
    } catch (e) {
        console.error(e);
        return Promise.reject(e)
    }
})

axiosInstance.interceptors.response.use(async (response: AxiosResponse<IResponse, any>) => {
    try {
        const { data } = response;
        if (data.success) {
            return response;
        } else {
            return Promise.reject(data.message)
        }
    } catch (e) {
        console.error(e);
        return Promise.reject(e)
    }
})

async function Request<T = any>(params: IRequestConfig, extraConfig?: IRequestConfig): Promise<IResponse<T>> {
    try {
        const Response = await axiosInstance.request<IResponse<T>>({ ...extraConfig, ...params })
        return Response.data;
    }
    catch (e) {
        console.error(e);
        return Promise.reject(e)
    }
}
export default Request;
import Request, { IRequestConfig } from '.';

const BASEURL = '/user';

function getUserInfo<T>(extraConfig?: IRequestConfig) {
    return Request<T>({ url: `${BASEURL}/info`, method: 'get' }, extraConfig);
}

function userLogin<T>({ email, password }: { email: string; password: string }, extraConfig?: IRequestConfig) {
    return Request<T>({ url: `${BASEURL}/login`, method: 'post', data: { email, password } }, extraConfig);
}

function userRegister<T>({ email, password, name }: { email: string; password: string; name: string }, extraConfig?: IRequestConfig) {
    return Request<T>({ url: `${BASEURL}/register`, method: 'post', data: { email, password, name } }, extraConfig);
}

function uploadAvatar<T>({ image }: { image: File }, extraConfig?: IRequestConfig) {
    return Request<T>(
        { url: `${BASEURL}/uploadAvatar`, method: 'post', data: { image }, headers: { 'Content-Type': 'multipart/form-data' } },
        extraConfig
    );
}

function updateUserInfo<T>(
    { name, email, password, confirmPassword }: { name: string; email: string; password: string; confirmPassword: string },
    extraConfig?: IRequestConfig
) {
    return Request<T>(
        {
            url: `${BASEURL}/updateUserInfo`,
            method: 'post',
            data: { name, email, password, confirmPassword }
        },
        extraConfig
    );
}
export { getUserInfo, userLogin, userRegister, uploadAvatar, updateUserInfo };

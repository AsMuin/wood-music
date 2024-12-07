import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getUserInfo, updateUserInfo, uploadAvatar, userLogin } from '@/service/api/user';
export interface IUser {
    name: string;
    email: string;
    avatar: string;
}
export interface UserStore {
    state: IUser;
    actions: {
        login: ({ email, password }: { email: string; password: string }) => void;
        layout: () => void;
        getUserInfo: () => void;
        updateUserAvatar: (avatar: File) => void;
        updateUserInfo: ({
            name,
            email,
            password,
            confirmPassword
        }: {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        }) => void;
    };
}
const useUserStore = create<UserStore>()(
    devtools((set, get) => ({
        state: {
            name: '',
            email: '',
            avatar: ''
        },
        actions: {
            login: async ({ email, password }) => {
                try {
                    const response = await userLogin<IUser>({ email, password });
                    const { data } = response;
                    if (response.token && data?.name && data?.email) {
                        set({ state: { ...data } });
                    } else {
                        return Promise.reject('用户数据异常');
                    }
                } catch (error) {
                    console.error(error);
                    return Promise.reject(error);
                }
            },
            layout: () => {
                localStorage.removeItem('token');
                set({ state: { name: '', email: '', avatar: '' } });
            },
            getUserInfo: async () => {
                try {
                    const store = get();
                    if (localStorage.getItem('token') && (!store.state.name || !store.state.email)) {
                        const response = await getUserInfo<IUser>();
                        const { data } = response;
                        if (data?.name && data?.email) {
                            set({ state: { ...data } });
                        } else {
                            return Promise.reject('用户数据异常');
                        }
                    }
                } catch (error) {
                    console.error(error);
                    return Promise.reject(error);
                }
            },
            updateUserAvatar: async (avatar: File) => {
                try {
                    const response = await uploadAvatar<IUser>({ image: avatar });
                    const { data } = response;
                    if (data?.avatar) {
                        set({ state: { ...data } });
                    } else {
                        return Promise.reject('更新数据异常');
                    }
                } catch (error) {
                    console.error(error);
                    return Promise.reject(error);
                }
            },
            updateUserInfo: async ({
                name,
                email,
                password,
                confirmPassword
            }: {
                name: string;
                email: string;
                password: string;
                confirmPassword: string;
            }) => {
                try {
                    const response = await updateUserInfo<IUser>({
                        name,
                        email,
                        password,
                        confirmPassword
                    });
                    const { data } = response;
                    if (data?.name && data?.email) {
                        set({ state: { ...data } });
                    }
                } catch (error: any) {
                    console.error(error);
                    return Promise.reject(error);
                }
            }
        }
    }))
);

export default useUserStore;

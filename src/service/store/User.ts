import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getUserInfo, userLogin } from '@/service/api/user';
interface UserStore {
    name: string;
    email: string;
    avatar: string;
    actions: {
        login: ({ email, password }: { email: string; password: string }) => void;
        layout: () => void;
    };
}
const useUserStore = create<UserStore>()(
    devtools((set, get) => ({
        name: '',
        email: '2132133',
        avatar: '',
        actions: {
            login: async ({ email, password }) => {
                try {
                    const response = await userLogin<Omit<UserStore, 'actions'>>({ email, password });
                    const { data } = response;
                    if (response.token && data?.name && data?.email) {
                        set({ ...data });
                    } else {
                        Promise.reject('用户数据异常');
                    }
                } catch (error) {
                    console.error(error);
                    Promise.reject(error);
                }
            },
            layout: () => {
                localStorage.removeItem('token');
                set({ name: '', email: '', avatar: '' });
            },
            getUserInfo: async () => {
                try {
                    const state = get();
                    if (localStorage.getItem('token') && (!state.name || !state.email)) {
                        const response = await getUserInfo<Omit<UserStore, 'actions'>>();
                        const { data } = response;
                        if (response.token && data?.name && data?.email) {
                            set({ ...data });
                        } else {
                            Promise.reject('用户数据异常');
                        }
                    }
                } catch (error) {
                    console.error(error);
                    Promise.reject(error);
                }
            }
        }
    }))
);

export default useUserStore;

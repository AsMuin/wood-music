import { SubmitHandler, useForm } from 'react-hook-form';
import Dialog from './UI/Dialog';
import { useEffect } from 'react';
import { userRegister } from '@/service/api/user';
import useUserStore from '@/service/store/User';
import useToggle from '@/Hooks/state/useToggle';
import { showMessage } from './MessageManager';
interface IFormSubmit {
    name: string;
    password: string;
    email: string;
}
type TFormType = 'login' | 'register';
function Login({ visible, setVisible }: { visible: boolean; setVisible: (visible: boolean) => void }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<IFormSubmit>();
    const [type, { toggle }] = useToggle<TFormType>('login', 'register');
    const { login } = useUserStore(state => state.actions);
    const onSubmit: SubmitHandler<IFormSubmit> = async (data: IFormSubmit) => {
        try {
            console.log(data);
            if (type === 'login') {
                await login(data);
                setVisible(false);
                showMessage({ type: 'success', message: '登录成功' });
            } else {
                await userRegister(data);
                reset();
                toggle();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const loginConfig = [
        {
            key: 'email',
            type: 'email',
            config: {
                required: '请输入邮箱',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '请输入正确的邮箱'
                }
            }
        },
        {
            key: 'password',
            type: 'password',
            config: {
                required: '请输入密码'
            }
        }
    ];
    const registerConfig = [
        {
            key: 'name',
            type: 'text',
            config: {
                required: '请输入用户名'
            }
        },
        {
            key: 'email',
            type: 'email',
            config: {
                required: '请输入邮箱'
            }
        },
        {
            key: 'password',
            type: 'password',
            config: {
                required: '请输入密码'
            }
        }
    ];
    const formElement = type === 'login' ? loginConfig : registerConfig;
    useEffect(() => {
        if (!visible) {
            reset();
        }
    }, [visible, reset]);
    return (
        <>
            <Dialog visible={visible} setVisible={setVisible}>
                <h3 className="mb-2 text-2xl font-bold text-invert duration-500 hover:text-main">{type === 'login' ? '登录' : '注册'}</h3>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    {formElement.map(item => (
                        <div className="" key={item.key}>
                            <input
                                className="placeholder-muted w-full rounded-md border px-2 py-4 text-highlight outline-none focus:border-pink-400 focus:shadow-lg"
                                type={item.type}
                                placeholder={'请填写' + item.key}
                                {...register(item.key as keyof IFormSubmit, item.config)}
                            />
                            <span className="text-sm text-red-500">{errors[item.key as keyof IFormSubmit]?.message}&nbsp;</span>
                        </div>
                    ))}
                    <div className="text-end">
                        <span
                            onClick={toggle}
                            className="ml-4 cursor-pointer text-sm font-medium underline underline-offset-1 duration-300 hover:text-red-500">
                            {type === 'login' ? '注册' : '登录'}点击这里
                        </span>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn glass relative top-5 mr-5 rounded-full px-6 text-lg hover:scale-105">
                            {isSubmitting ? <span className="loading loading-spinner"></span> : '确定'}
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    );
}

export default Login;

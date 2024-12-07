import useToggle from '@/Hooks/state/useToggle';
import { assets } from '@/assets/assets';
import { useDrawerContext } from '@/service/context/Drawer';
import useUserStore from '@/service/store/User';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface IFormSubmit {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
function UserInfo() {
    const [isEdit, { setDefault, setReverse, toggle }] = useToggle(false, true);
    const userInfo = useUserStore(store => store.state);
    const { updateUserAvatar, layout } = useUserStore(store => store.actions);
    const { drawerVisible, drawerClose } = useDrawerContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<IFormSubmit>({
        defaultValues: {
            name: userInfo.name,
            email: userInfo.email,
            password: '',
            confirmPassword: ''
        }
    });
    function onLayout() {
        reset();
        drawerClose();
        layout();
    }
    const formConfig = [
        {
            key: 'name',
            label: '用户名',
            type: 'text',
            placeholder: '请输入修改的用户名',
            config: {
                required: '填写修改后的用户名'
            }
        },
        {
            key: 'email',
            label: '邮箱地址',
            type: 'text',
            placeholder: '请输入邮箱',
            config: {
                required: '请填写邮箱信息',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '请输入正确的邮箱'
                }
            }
        },
        {
            key: 'password',
            label: '密码',
            type: 'password',
            placeholder: '请输入密码',
            config: {
                required: '请填写密码'
            }
        },
        {
            key: 'confirmPassword',
            label: '确认密码',
            type: 'password',
            placeholder: '请再次输入密码',
            config: {
                required: '请再次输入密码',
                validate: {
                    validateConfirmPassword: (value: string, data: IFormSubmit) => {
                        return value === data.password || '两次密码不一致';
                    }
                }
            }
        }
    ];
    function onUploadFile() {
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.style.display = 'none';
        inputFile.onchange = async (event: any) => {
            console.log(inputFile.files);
            const avatar = event.target.files[0];
            await updateUserAvatar(avatar);
            inputFile.onchange = null;
        };
        inputFile.click();
    }
    const onSubmit: SubmitHandler<IFormSubmit> = data => {
        console.log(data);
        setDefault();
    };
    useEffect(() => {
        if (!drawerVisible) {
            reset();
        }
    }, [drawerVisible, reset]);
    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <p className="cursor-pointer text-highlight underline underline-offset-4 duration-500 hover:text-red-500" onClick={onLayout}>
                    登出
                </p>
                <input type="checkbox" className="toggle" checked={isEdit} onChange={toggle} />
            </div>
            <h2 className="text-center text-2xl font-bold md:text-start">{isEdit ? '更改信息' : ' 个人信息'}</h2>
            <div className="mx-auto my-4">
                <div
                    className="group relative mx-auto mb-8 h-14 w-14 overflow-hidden rounded-full duration-500 hover:scale-110"
                    onClick={onUploadFile}>
                    <img className="h-full w-full" src={userInfo.avatar || assets.spotify_logo} alt="" />
                    <div className="absolute top-0 hidden h-full w-full cursor-pointer bg-muted/80 text-center text-xs leading-[3.5rem] group-hover:block">
                        修改头像
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formConfig.map(item => (
                            <div className="group mx-auto mb-4 text-center text-lg" key={item.key}>
                                {isEdit ? (
                                    <>
                                        <label htmlFor={item.key} className="mb-2 block">
                                            {item.label}
                                        </label>
                                        <input
                                            className="rounded-md bg-base p-2 outline-none duration-500 focus:shadow-md focus:shadow-highlight"
                                            type={item.type}
                                            placeholder={item.placeholder}
                                            {...register(item.key as keyof IFormSubmit, item.config)}
                                        />
                                        {errors[item.key as keyof IFormSubmit]?.message && (
                                            <p className="mt-1.5 text-xs text-red-600">{errors[item.key as keyof IFormSubmit]?.message}</p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <label
                                            htmlFor={item.key}
                                            className={`mb-2 text-xl duration-500 group-hover:scale-110 ${item.type === 'password' ? 'hidden' : 'block'}`}>
                                            {item.label}
                                        </label>
                                        <p
                                            className={`text-highlight duration-500 group-hover:scale-110 ${item.type === 'password' ? 'hidden' : 'block'}`}>
                                            {(userInfo as any)[item.key]}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                        {isEdit ? (
                            <div className="text-center">
                                <button type="submit" className="btn glass rounded-full bg-main duration-500">
                                    确定
                                </button>
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>
        </>
    );
}
export default UserInfo;

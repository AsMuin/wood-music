import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "./UI/Dialog";
import { useEffect, useState } from "react";
import { userRegister } from "@/service/api/user"
import useUserStore from "@/service/store/User";
import useToggle from "@/Hooks/state/useToggle";
interface IFormSubmit {
    name: string,
    password: string,
    email: string,
}
type TFormType = "login" | "register"
function Login({ visible, setVisible }: { visible: boolean, setVisible: (visible: boolean) => void }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful, isLoading } } = useForm<IFormSubmit>();
    const [type, { toggle }] = useToggle<TFormType>("login", "register")
    const { login } = useUserStore(state => state.actions)
    const onSubmit: SubmitHandler<IFormSubmit> = async data => {
        try {
            console.log(data);
            if (type === "login") {
                // await login(data)
                setVisible(false)
            } else {
                // await userRegister(data)
                reset()
                toggle()
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
                required: '请输入密码',
            }
        }
    ]
    const resigterConfig = [
        {
            key: 'name',
            type: 'text',
            config: {
                required: '请输入用户名',
            }
        },
        {
            key: 'email',
            type: 'email',
            config: {
                required: '请输入邮箱',
            }
        },
        {
            key: 'password',
            type: 'password',
            config: {
                required: '请输入密码',
            }
        }
    ]
    const formElement = type === 'login' ? loginConfig : resigterConfig;
    useEffect(() => {
        if (!visible) {
            reset()
        }
    }, [visible])
    return (
        <>
            <Dialog visible={visible} setVisible={setVisible}>
                <h3 className="text-invert font-bold text-2xl mb-2 hover:text-main  duration-500 ">{type === 'login' ? "登录" : "注册"}</h3>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    {
                        formElement.map((item) => (
                            <div className="" key={item.key}>
                                <input className="text-highlight placeholder-muted outline-none w-full px-2 py-4 border  rounded-md  focus:border-pink-400 focus:shadow-lg" type={item.type} placeholder={"请填写" + item.key} {...register(item.key as keyof IFormSubmit, item.config)} />
                                <span className="text-red-500 text-sm">{errors[item.key as keyof IFormSubmit]?.message}&nbsp;</span>
                            </div>
                        ))
                    }
                    <div className="text-end ">
                        <button type="submit" className="btn rounded-full px-6 text-lg glass hover:scale-105 mr-5 relative top-5" >
                            {isLoading ? <span className="loading loading-spinner"></span> : "确定"}
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default Login;
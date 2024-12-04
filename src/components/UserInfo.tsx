import useToggle from "@/Hooks/state/useToggle";
import { assets } from "@/assets/assets";
import DrawerContext from "@/service/context/Drawer";
import useUserStore from "@/service/store/User";
import { UserInfo } from "os";
import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
interface IFormSubmit {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
function UserInfo() {
    const [isEdit, { setDefault, setReverse, toggle }] = useToggle(false, true);
    const userInfo = useUserStore(state => state)
    const { drawerVisible } = useContext(DrawerContext)!
    const { register, handleSubmit, reset, formState: {
        errors, isSubmitting
    } } = useForm<IFormSubmit>({
        defaultValues: {
            name: userInfo.name,
            email: userInfo.email,
            password: "",
            confirmPassword: ""
        }
    });
    const formConfig = [
        {
            key: "name",
            label: "用户名",
            type: "text",
            placeholder: "请输入修改的用户名",
            config: {
                required: "填写修改后的用户名"
            }
        },
        {
            key: "email",
            label: "邮箱地址",
            type: "text",
            placeholder: "请输入邮箱",
            config: {
                required: "请填写邮箱信息",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "请输入正确的邮箱"
                }
            }
        },
        {
            key: "password",
            label: "密码",
            type: "password",
            placeholder: "请输入密码",
            config: {
                required: "请填写密码"
            }
        },
        {
            key: "confirmPassword",
            label: "确认密码",
            type: "password",
            placeholder: "请再次输入密码",
            config: {
                required: "请再次输入密码",
                validate: {
                    validateConfirmPassword: (value: string, data: IFormSubmit) => {
                        return value === data.password || "两次密码不一致";
                    }
                }
            }
        }
    ]
    function onUploadFile(){
        const inputFile = document.createElement("input");
        inputFile.type = "file";
    }
    const onSumbit: SubmitHandler<IFormSubmit> = (data) => {
        console.log(data);
        setDefault()
    }
    useEffect(() => {
        if (!drawerVisible) {
            reset()
        }
    }, [drawerVisible])
    return (
        <>
            <div className="text-end">
                <input type="checkbox" className="toggle" checked={isEdit} onClick={toggle} />
            </div>
            <h2 className="text-2xl font-bold text-center md:text-start">{isEdit ? "更改信息" : " 个人信息"}
            </h2>
            <div className="my-4 mx-auto">
                <div className="rounded-full mx-auto w-14 h-14 hover:scale-110 duration-500 group relative overflow-hidden mb-8">
                    <img className="w-full h-full" src={assets.spotify_logo} alt="" />
                    <div className="hidden w-full h-full bg-muted/80 absolute top-0  text-center text-xs leading-[3.5rem] group-hover:block cursor-pointer">
                        修改头像
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSumbit)}>
                        {formConfig.map(item => (
                            <div className="text-center text-lg  mx-auto mb-4 group" key={item.key}>
                                {isEdit ? (
                                    <>
                                        <label htmlFor={item.key} className="block mb-2">{item.label}</label>
                                        <input className="p-2 rounded-md outline-none  focus:shadow-highlight focus:shadow-md duration-500 bg-base" type={item.type} placeholder={item.placeholder} {...register(item.key as keyof IFormSubmit, item.config)} />
                                        {errors[item.key as keyof IFormSubmit]?.message && <p className="mt-1.5 text-xs text-red-600 ">{errors[item.key as keyof IFormSubmit]?.message}</p>}
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor={item.key} className={`text-xl mb-2 group-hover:scale-110 duration-500 ${item.type === "password" ? "hidden" : 'block'}`}>{item.label}</label>
                                        <p className={`text-highlight group-hover:scale-110 duration-500 ${item.type === "password" ? "hidden" : 'block'}`}>{(userInfo as any)[item.key]}</p>
                                    </>
                                )}
                            </div>
                        ))}
                        {isEdit ? (
                            <div className="text-center">
                                <button type="submit" className="btn rounded-full bg-main glass duration-500">确定</button>
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>
        </>
    )
}
export default UserInfo;
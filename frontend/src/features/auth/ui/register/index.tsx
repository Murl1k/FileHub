import styles from '../styles.module.scss'
import {avatarIcon} from "../../../../app/assets/images";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {fetchLogin, fetchLoginMe, fetchRegister, IUser} from "../../";

interface IRegister extends IUser {
    passwordAgain: string
}

const Register = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
            passwordAgain: ''
        },
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IRegister> = async (values) => {
        try {
            if (values.password !== values.passwordAgain) {
                return alert('Passwords dont match')
            }

            const register = await dispatch(fetchRegister(values))

            if (typeof register.payload === "object") {
                const data = await dispatch(fetchLogin({
                    password: values.password,
                    username: values.username
                }))
                dispatch(fetchLoginMe())
                navigate('/')
                localStorage.setItem('token', data.payload.auth_token)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.auth}>
            <img src={avatarIcon} alt="avatar"/>
            <h3>SIGN UP</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input
                    {...register('username', {required: true})}
                    placeholder='Name'
                    type="text"
                />
                <input
                    {...register('password', {required: true})}
                    placeholder='Password'
                    type="password"
                />
                <input
                    {...register('passwordAgain', {required: true})}
                    placeholder='Password again'
                    type="password"
                />
                <button type='submit'>
                    SIGN UP
                </button>
            </form>
        </div>
    );
};

export default Register;
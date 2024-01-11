import styles from '../styles.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {fetchLogin, fetchLoginMe, fetchRegister} from "../../model/auth.action.ts";
import {IUser} from "../../../../shared/types";

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

            await dispatch(fetchRegister(values))
            const data = await dispatch(fetchLogin({
                password: values.password,
                username: values.username
            }))
            dispatch(fetchLoginMe())

            localStorage.setItem('token', data.payload.auth_token)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.auth}>
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
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
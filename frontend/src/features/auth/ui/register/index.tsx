import styles from '../styles.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {fetchLogin, fetchLoginMe, fetchRegister, IUser} from "../../";
import {avatarIcon} from "../../../../app/assets/images";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {PrimaryButton} from "../../../../shared/UIKit/buttons";

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
        if (values.password !== values.passwordAgain) {
            return toast.error("Passwords don't match.")
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
    }

    return (
        <div className={styles.auth}>
            <img src={avatarIcon} alt="avatar"/>
            <h3>SIGN UP</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <label>
                    <p>Name</p>
                    <input
                        {...register('username', {required: true})}
                        placeholder='Name'
                        type="text"
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        {...register('password', {required: true})}
                        placeholder='Password'
                        type="password"
                    />
                </label>
                <label>
                    <p>Password again</p>
                    <input
                        {...register('passwordAgain', {required: true})}
                        placeholder='Password again'
                        type="password"
                    />
                </label>
                <PrimaryButton type='submit'>
                    Sign Up
                </PrimaryButton>
                <p>Already have an account? <Link to='/auth/login'>Log in.</Link></p>
            </form>
        </div>
    );
};

export default Register;
import styles from '../styles.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {fetchLogin, fetchLoginMe, IUser} from "../../";
import {avatarIcon} from '../../../../app/assets/images'
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {PrimaryButton} from "../../../../shared/UIKit/buttons";

const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            password: '',
            username: ''
        },
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IUser> = async (values) => {
        try {
            const data = await dispatch(fetchLogin(values))

            if (typeof data.payload === "object") {
                dispatch(fetchLoginMe())
                localStorage.setItem('token', data.payload.auth_token)
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.auth}>
            <img src={avatarIcon} alt="avatar"/>
            <h3>Sign in to Account</h3>
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
                <PrimaryButton type='submit'>
                    Sign In
                </PrimaryButton>
                <p>Don't have an account? <Link to='/auth/register'>Register now!</Link></p>
            </form>
        </div>
    );
};

export default Login;
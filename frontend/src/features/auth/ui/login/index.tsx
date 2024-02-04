import styles from '../styles.module.scss'
import {avatarIcon} from '../../../../app/assets/images'
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {fetchLogin, fetchLoginMe, IUser} from "../../";

const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
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
            <h3>SIGN IN</h3>
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
                <button type='submit'>
                    SIGN IN
                </button>
            </form>
        </div>
    );
};

export default Login;
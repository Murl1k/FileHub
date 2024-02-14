import styles from '../styles.module.scss'
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {fetchSetUsername, IChangeUsername} from "../../../auth";

const UpdateUsername = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {isValid, errors}
    } = useForm({
        defaultValues: {
            current_password: '',
            new_username: ''
        },
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IChangeUsername> = async (values) => {
        const data = await dispatch(fetchSetUsername(values))

        if (data.payload === "") {
            navigate('/')
        }
    }

    return (
        <div className={styles.update}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h3>Change your username</h3>
                <label>
                    <p>Password</p>
                    <input
                        style={errors.current_password ? {border: '1px solid red'} : {}}
                        type="password"
                        placeholder='Password'
                        {...register('current_password', {required: true})}
                    />
                </label>
                <label>
                    <p>New Username</p>
                    <input
                        style={errors.new_username ? {border: '1px solid red'} : {}}
                        type="text"
                        placeholder='New username'
                        {...register('new_username', {required: true})}
                    />
                </label>
                <button type='submit' disabled={!isValid}>
                    Change my username
                </button>
            </form>
            <div className={styles.alert}>
                <h4>Username must contain:</h4>
                <div>
                    <p>150 characters or fewer</p>
                    <p>Letters, digits and @/./+/-/_ only</p>
                </div>
            </div>
        </div>
    );
};

export default UpdateUsername;
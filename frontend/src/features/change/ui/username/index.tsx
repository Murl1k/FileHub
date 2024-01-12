import styles from '../styles.module.scss'
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IChangeUsername} from "../../../../shared/types";
import {fetchSetUsername} from "../../../auth/model/auth.action.ts";

const Username = () => {

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
        try {
            await dispatch(fetchSetUsername(values))

            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.change}>
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
                <button className={!isValid ? styles.disabledBtn : ''} type='submit' disabled={!isValid}>Change my
                    username
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

export default Username;
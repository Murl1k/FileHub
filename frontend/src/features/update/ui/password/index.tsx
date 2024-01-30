import styles from '../styles.module.scss'
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IChangePassword} from "../../../../shared/types";
import {fetchSetPassword} from "../../../auth/model/auth.action.ts";

const UpdatePassword = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {isValid, errors}
    } = useForm({
        defaultValues: {
            new_password: '',
            re_new_password: '',
            current_password: ''
        },
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IChangePassword> = async (values) => {
        const data = await dispatch(fetchSetPassword(values))

        if (!data.payload) {
            navigate('/')
        }
    }

    return (
        <div className={styles.update}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h3>Change your password</h3>
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
                    <p>New Password</p>
                    <input
                        style={errors.new_password ? {border: '1px solid red'} : {}}
                        type="password"
                        placeholder='New password'
                        {...register('new_password', {required: true})}
                    />
                </label>
                <label>
                    <p>Confirm New Password</p>
                    <input
                        style={errors.re_new_password ? {border: '1px solid red'} : {}}
                        type="password"
                        placeholder='New password again'
                        {...register('re_new_password', {required: true})}
                    />
                </label>
                <button className={!isValid ? styles.disabledBtn : ''} type='submit' disabled={!isValid}>
                    Change my password
                </button>
            </form>
            <div className={styles.alert}>
                <h4>Password must contain:</h4>
                <div>
                    <p>At least 1 character</p>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
import styles from './styles.module.scss'
import Breadcrumbs from "../../shared/UIKit/breadcrumbs";
import {SubmitHandler, useForm} from "react-hook-form";
import {IChangePassword, IChangeUsername} from "../../shared/types";
import {useAppDispatch} from "../../shared/lib/hooks/useAppDispatch.ts";
import {fetchSetPassword, fetchSetUsername} from "../../features/auth/model/auth.action.ts";

const Settings = () => {

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            new_password: '',
            re_new_password: '',
            current_password: '',
            new_username: ''
        },
        mode: 'onChange'
    })

    const onSubmitPassword: SubmitHandler<IChangePassword> = (values) => {
        try {
            dispatch(fetchSetPassword(values))
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmitUsername: SubmitHandler<IChangeUsername> = (values) => {
        try {
            dispatch(fetchSetUsername({
                current_password: values.current_password,
                new_username: values.new_username
            }))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.settings}>
            <Breadcrumbs/>
            <div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmitPassword)}>
                    <h3>Change password</h3>
                    <input
                        type="password"
                        placeholder='current password'
                        {...register('current_password', {required: true})}
                    />
                    <input
                        type="password"
                        placeholder='new password'
                        {...register('new_password')}
                    />
                    <input
                        type="password"
                        placeholder='new password again'
                        {...register('re_new_password')}
                    />
                    <button type='submit'>Change password</button>
                </form>
                <form className={styles.form} onSubmit={handleSubmit(onSubmitUsername)}>
                    <h3>Change username</h3>
                    <input
                        type="text"
                        placeholder='new username'
                        {...register('new_username', {required: true})}
                    />
                    <input

                        type="password"
                        placeholder='current password'
                        {...register('current_password', {required: true})}
                    />
                    <button type='submit'>Change username</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
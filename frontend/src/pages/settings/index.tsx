import styles from './styles.module.scss'
import Breadcrumbs from "../../shared/UIKit/breadcrumbs";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../shared/lib/hooks/useAppDispatch.ts";
import {fetchDeleteMyAccount} from "../../features/auth/model/auth.action.ts";
import {ChangeEvent, useState} from "react";

const Settings = () => {

    const dispatch = useAppDispatch()

    const [password, setPassword] = useState('')

    const handleDeleteAccount = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const deleteMyAccount = () => {
        dispatch(fetchDeleteMyAccount(password))
    }

    console.log(password)

    return (
        <div className={styles.settings}>
            <Breadcrumbs/>
            <div className={styles.change} style={{display: 'grid', gap: '10px'}}>
                <Link to='/security/change-password'>
                    <button>Change password</button>
                </Link>
                <Link to='/security/change-username'>
                    <button>Change username</button>
                </Link>
                <div>
                    <input type="password" value={password} onChange={handleDeleteAccount}/>
                    <button onClick={deleteMyAccount}>Delete</button>
                </div>
                <button className={styles.deleteBtn}>Delete my account</button>
            </div>
        </div>
    );
};

export default Settings;
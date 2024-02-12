import styles from "./styles.module.scss";
import {AvatarSvg, FolderSvg, LogoutSvg} from '../../../app/assets/images/'
import {Link, NavLink} from "react-router-dom";
import {fetchLogout} from "../../../features/auth";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {api} from "../../../shared/api/api.ts";
import {toast} from "react-toastify";
import {useState} from "react";
import {OptionButton} from "../../../shared/UIKit/buttons";
import {UsedSize} from "../../../features/used-size";

const Menu = () => {

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const logout = async () => {
        if (!localStorage.getItem('token')) {
            return toast.error('You are not authorized.')
        }

        await dispatch(fetchLogout())
        dispatch(api.util.resetApiState())
    }

    return (
        <aside className={isOpen ? `${styles.nav} ${styles.navActive}` : styles.nav}>
            <div>
                <div>
                    <Link to='/'>
                        <img height={40} width={40} src="/vite.svg" alt="logo"/>
                    </Link>
                    <OptionButton onClick={() => setIsOpen(!isOpen)}/>
                </div>
                <ul>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/'>
                            <FolderSvg/>
                            <p>My Cloud</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/profile'>
                            <AvatarSvg style={{marginLeft: '3px'}} width="25" height="25"/>
                            <p>Profile</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <ul>
                {localStorage.getItem('token') && <UsedSize/>}
                <li className={styles.logoutBtn} onClick={logout}>
                    <LogoutSvg/>
                    <p>Log out</p>
                </li>
            </ul>
        </aside>
    );
};

export default Menu;
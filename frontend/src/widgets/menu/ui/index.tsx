import styles from "./styles.module.scss";
import {
    DeleteSvg,
    FavoritesSvg,
    FileSvg,
    FolderSvg,
    HelpSvg,
    LogoutSvg,
    PrivateSvg,
    SharedSvg
} from '../../../app/assets/images/'
import {Link, NavLink} from "react-router-dom";
import {fetchLogout} from "../../../features/auth";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {api} from "../../../shared/api/api.ts";
import {toast} from "react-toastify";
import {useState} from "react";

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
                <Link to='/'>
                    <img height={40} src="/vite.svg" alt="logo"/>
                </Link>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <ul>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/'>
                        <FolderSvg/>
                        <p>My Cloud</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/shared'>
                        <SharedSvg/>
                        <p>Shared</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/all-files'>
                        <FileSvg/>
                        <p>All files</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/favorites'>
                        <FavoritesSvg/>
                        <p>Favorites</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/private-files'>
                        <PrivateSvg/>
                        <p>Private files</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/deleted-files'>
                        <DeleteSvg/>
                        <p>Deleted files</p>
                    </NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/help'>
                        <HelpSvg/>
                        <p>Help & Support</p>
                    </NavLink>
                </li>
                <li className={styles.logoutBtn} onClick={logout}>
                    <LogoutSvg/>
                    <p>Log out</p>
                </li>
            </ul>
        </aside>
    );
};

export default Menu;
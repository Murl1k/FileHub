import styles from "./styles.module.scss";
import {
    deleteIcon,
    favoritesIcon,
    fileIcon,
    folderIcon,
    helpIcon,
    logoutIcon,
    privateIcon,
    sharedIcon
} from '../../../app/assets/images/'
import {Link, NavLink} from "react-router-dom";
import {fetchLogout} from "../../../features/auth/model/auth.action.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {selectIsAuth} from "../../../features/auth/model/auth.slice.ts";

const Menu = () => {

    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(selectIsAuth)

    const logout = () => {
        if (!isAuth) {
            return alert('You are not authorized')
        }

        dispatch(fetchLogout())
    }

    return (
        <aside className={styles.nav}>
            <Link style={{marginLeft: '20px',}} to='/'>
                <img height={40} src="/vite.svg" alt="logo"/>
            </Link>
            <ul>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/'>
                        <img src={folderIcon} alt="folder"/>
                        <p>My Cloud</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/shared'>
                        <img src={sharedIcon} alt="shared"/>
                        <p>Shared</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/all-files'>
                        <img src={fileIcon} alt="file"/>
                        <p>All files</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/favorites'>
                        <img src={favoritesIcon} alt="favorites"/>
                        <p>Favorites</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/private-files'>
                        <img src={privateIcon} alt="private"/>
                        <p>Private files</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/deleted-files'>
                        <img src={deleteIcon} alt="delete"/>
                        <p>Deleted files</p>
                    </NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink className={({isActive}) => isActive ? styles.active : ''} to='/help'>
                        <img src={helpIcon} alt="help"/>
                        <p>Help & Support</p>
                    </NavLink>
                </li>
                <li className={styles.logoutBtn} onClick={logout}>
                    <img src={logoutIcon} alt="logout"/>
                    <p>Log out</p>
                </li>
            </ul>
        </aside>
    );
};

export default Menu;
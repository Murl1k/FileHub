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
        <aside className={isOpen ? `${styles.sidebar} ${styles.sidebarActive}` : styles.sidebar}>
            <div>
                <div>
                    <Link to='/'>
                        {/*<img*/}
                        {/*    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVR4nO2ZT2xURRzHXw3RGPWI4L7Xf3ZXsGCwJUpsZ94SItEQXGyxnVfdLRzgIgercpAQU01gXz2o0QPERGVmu93alvAnUUEvcNMLf4SWgwf3TXswRoqRXqxIx/ze7kYsW96892ZLNftNfqedN/l95jfz+/1mVtOqqqqqikm3+axu82u6zSd02zmup/m7up3fGP3ox/u0/4IMm4typtv8N8PmnzxywGnVloK62zPrCGJvWJiOEsx+iKRycyt2DJd1/nYY51TkQP7JRXc60fbpQ5bJ3rQQvWJhJm615TuHXZMBMMDSzl+G7XxovD95f8Udj8fPLLMQfd3CbHq+44EB7BIIv6i/NxWrmPM98SOrCWYXFnI8NIDNhZ52piMDTpty5y2TJixEZ7ycDwtguObMGAOTTytzniCWshC9IeO8GgAO5+JXJdupuPLSzv8LIP1TKAg97VwKdbB7zM9jFmbX/Th/KwAYpNP63hER3fW1aNh3MUgkPgicbWQOrBfAfGvqPSrq91/2lWIjQepEMVVKO00w+5NgNtaNj7wC2Sq5OfPABuvkivXb2JYnOrKHYiQ3BdFwo7JzWET3nPETia/8F6k75PnbDNETsN285l3fkdkcJdmfS9GI7TolG4W5iJ1vkV99qLByq36TYPaWr9XRxD1rX8p+83AxGrE9Z2VT62F5gDLtwQIAPp3/RwCxvHjIG/ZPeGckm19r7h+/V6oxk902miZqggJAJGLWkLudor3HJKMwaSrZPnBgZfa8l1o7MptKB7tBIjPpNn/HGwDTUQmAMU2RYiQ3BQCrdp+WKGz8mOeEBLFLngAme1kVwLrOwcMA8GhyTKYyj0sA0KteAF1tg6tUAbR05J4HgNrUF1L9keeEFqazngDx0QdVATzV9eVKAFgpcYPT0/wPJQBQ6FQBtCVORAAg0qsIYLG3UOuLw1sBoC4ps4X4L0oOMfQ7qgDWdGY/c2uBzCG2+cSSS6NNPYVitnr3tzIROOo5YeF5ZJEKWefQc9ATgTW+fUUmC/UvpVaipnn7UL7UmdbvGBONe7+/I0DtAEdSU1uIXq50M2dhum/bpoxo6RxyU2gJpDE1Kpr6vitXxKa1frFMeTsNjviLhKiBbwrfMnee7RuZ2JDIuqm0BFKXGhGxV88K42B+rphCP67YhYYgdlLmTMAYGLtgejaZaN+aFbXJnAtRm8zdbNx7/lkj7YzUHXSafYaY9ckClLtSQrUGIyZ73EI0Cb/BGJm5uk0m4lsGxTOJwUNaULmXekTP+4FQaoieAx+0MHJDjunvd8H5GYiipkJBHrZCOn+jpz3zgqZSfp8WwzhPEEtplRCsSpBXOh92XfnKzxd0oRU52IieI4g9pi2G3D84MOuTabu9jCB6lZj0tdDZJoggxxcqNp3w7Thm49A0dim82YVSdzyzthAVNlJ8EJ4u3OzorLvKmF2A32AMjL3b/lZV1f9JfwP3XZ5oQQc1jgAAAABJRU5ErkJggg=="/>*/}
                        <img src="/logo.png" alt="logo"/>
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
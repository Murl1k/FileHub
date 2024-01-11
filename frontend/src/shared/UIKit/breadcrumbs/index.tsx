import {Link, useLocation} from "react-router-dom";
import styles from './styles.module.scss'

const Breadcrumbs = () => {

    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname
        .split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
                currentLink += `/${crumb}`

                return (
                    <li className={styles.crumb} key={crumb}>
                        <Link to={currentLink}>{crumb}</Link>
                    </li>
                )
            }
        )

    return (
        <nav className={styles.breadcrumbs}>
            <ul>
                {crumbs}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
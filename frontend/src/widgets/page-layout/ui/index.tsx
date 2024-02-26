import styles from './styles.module.scss'
import {Outlet} from "react-router-dom";

const PageLayout = () => {
    return (
        <div className={styles.page}>
            <Outlet/>
        </div>
    );
};

export default PageLayout;
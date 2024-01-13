import styles from './styles.module.scss'
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <span>😔</span>
            <div>
                <p>404</p>
                <p>Page not found</p>
            </div>
            <Link to='/'>
                <button>Back To Home</button>
            </Link>
        </div>
    );
};

export default NotFound;
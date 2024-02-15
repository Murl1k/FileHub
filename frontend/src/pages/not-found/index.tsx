import styles from './styles.module.scss'
import {Link} from "react-router-dom";
import {PrimaryButton} from "../../shared/UIKit/buttons";

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <span>😔</span>
            <div>
                <p>404</p>
                <p>Page not found</p>
            </div>
            <Link to='/'>
                <PrimaryButton>Back To Home</PrimaryButton>
            </Link>
        </div>
    );
};

export default NotFound;
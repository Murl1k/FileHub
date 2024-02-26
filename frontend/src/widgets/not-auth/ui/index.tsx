import styles from './styles.module.scss'
import {Link} from "react-router-dom";

const NotAuth = () => {
    return (
        <div className={styles.notAuth}>
            <span>You are not authorized ❌</span>
            <div className={styles.btns}>
                <Link to='/auth/login'>
                    <button>Login</button>
                </Link>
                <Link to='/auth/register'>
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default NotAuth;
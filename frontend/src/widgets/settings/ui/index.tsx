import styles from './styles.module.scss';
import {Link} from "react-router-dom";
import {Email} from "../../../features/change";

const Settings = () => {
    return (
        <div className={styles.settings}>
            <div>
                <p>If you want to change password: </p>
                <Link to='/security/change-password'>
                    <button>Change password</button>
                </Link>
            </div>
            <div>
                <p>If you want to change username: </p>
                <Link to='/security/change-username/'>
                    <button>Change username</button>
                </Link>
            </div>
            <Email/>
        </div>
    );
};

export default Settings;
import styles from './styles.module.scss';
import {Link} from "react-router-dom";
import {UpdateEmail} from "../../../features/update";

const Settings = () => {
    return (
        <div className={styles.settings}>
            <Link to='/security/change-password'>
                <button>Change password</button>
                <p>&gt;&gt;</p>
            </Link>
            <Link to='/security/change-username/'>
                <button>Change username</button>
                <p>&gt;&gt;</p>
            </Link>
            <UpdateEmail/>
        </div>
    );
};

export default Settings;
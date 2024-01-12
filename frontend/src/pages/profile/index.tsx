import styles from './styles.module.scss'
import avatarIcon from '../../app/assets/images/avatar.svg'
import Input from "../../shared/UIKit/input";
import {Link} from "react-router-dom";
import {Email} from "../../features/change";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <h2>Profile</h2>
            <div className={styles.card}>
                <span>
                    <img src={avatarIcon} alt="avatar"/>
                </span>
                <Email/>
                <label htmlFor="password">
                    <h4>Password</h4>
                    <Input id='password' type="password" placeholder='********' disabled/>
                </label>
            </div>
            <div className={styles.cardBtns}>
                <Link to='/'>
                    <button>Back To Home</button>
                </Link>
                <Link to='settings'>
                    <button>Edit</button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
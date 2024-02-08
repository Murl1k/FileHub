import styles from './styles.module.scss'
import {avatarIcon} from '../../app/assets/images'
import {Link} from "react-router-dom";
import {useState} from "react";
import {PersonalDetails} from "../../widgets/personal-details";
import {Settings} from "../../widgets/settings";

const Profile = () => {

    const [isActive, setIsActive] = useState(true)

    return (
        <div className={styles.profile}>
            <h2>Profile</h2>
            <span>
                <img src={avatarIcon} alt="avatar"/>
            </span>
            <div className={styles.container}>
                <div
                    className={isActive
                        ? styles.containerHeadline
                        : `${styles.containerHeadline} ${styles.settingsActive}`}
                >
                    <p onClick={() => setIsActive(true)}>
                        Personal details
                    </p>
                    <p onClick={() => setIsActive(false)}>
                        Settings
                    </p>
                </div>
                {isActive ?
                    <PersonalDetails/> :
                    <Settings/>
                }
                <div className={styles.backToHomeBtn}>
                    <Link to='/'>
                        <button>Back To Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
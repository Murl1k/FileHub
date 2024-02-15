import styles from './styles.module.scss'
import {avatarIcon} from '../../app/assets/images'
import {Link} from "react-router-dom";
import {useState} from "react";
import {PersonalDetails} from "../../widgets/personal-details";
import {Settings} from "../../widgets/settings";
import {PrimaryButton} from "../../shared/UIKit/buttons";

const Profile = () => {

    const [isActive, setIsActive] = useState(location.hash !== '#settings')

    return (
        <section className={styles.profile}>
            <h2>Profile</h2>
            <span>
                <img src={avatarIcon} alt="avatar"/>
            </span>
            <section className={styles.container}>
                <div
                    className={isActive
                        ? styles.containerHeadline
                        : `${styles.containerHeadline} ${styles.settingsActive}`}
                >
                    <Link to='' onClick={() => setIsActive(true)}>
                        Personal details
                    </Link>
                    <Link to='#settings' onClick={() => setIsActive(false)}>
                        Settings
                    </Link>
                </div>
                {!isActive ?
                    <Settings/> :
                    <PersonalDetails/>
                }
                <div className={styles.backToHomeBtn}>
                    <Link to='/'>
                        <PrimaryButton>Back To Home</PrimaryButton>
                    </Link>
                </div>
            </section>
        </section>
    );
};

export default Profile;
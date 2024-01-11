import styles from './styles.module.scss'
import avatarIcon from '../../app/assets/images/avatar.svg'
import Input from "../../shared/UIKit/input";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../shared/lib/hooks/useAppSelector.ts";

const Profile = () => {

    const {data} = useAppSelector(state => state.auth)

    return (
        <div className={styles.profile}>
            <h2>Profile</h2>
            <div className={styles.card}>
                <span>
                    <img src={avatarIcon} alt="avatar"/>
                </span>
                <label htmlFor="username">
                    <h4>Username</h4>
                    <Input id='username' type="text" placeholder={data?.username}/>
                </label>
                <label htmlFor="email">
                    <h4>Email</h4>
                    <Input id='email' type="text" placeholder={data?.email}/>
                </label>
                <label htmlFor="password">
                    <h4>Password</h4>
                    <Input id='password' type="password" placeholder='********'/>
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
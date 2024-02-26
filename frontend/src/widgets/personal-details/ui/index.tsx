import styles from './styles.module.scss';
import Input from "../../../shared/UIKit/input";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";

const PersonalDetails = () => {

    const {data} = useAppSelector(state => state.auth)

    return (
        <div className={styles.personalDetails}>
            <label htmlFor="username">
                <h4>Username</h4>
                <Input id='username' type="text" placeholder={data?.username} disabled/>
            </label>
            <label htmlFor="email">
                <h4>Email</h4>
                <Input id='email' type="text" placeholder={data?.email} disabled/>
            </label>
            <label htmlFor="password">
                <h4>Password</h4>
                <Input id='password' type="password" placeholder='********' disabled/>
            </label>
        </div>
    );
};

export default PersonalDetails;
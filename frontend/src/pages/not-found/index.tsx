import styles from './styles.module.scss'
import {useNavigate} from "react-router-dom";
import {PrimaryButton} from "../../shared/UIKit/buttons";

const NotFound = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        if (localStorage.getItem('token')) {
            navigate('/')
        } else {
            navigate('/introduction')
        }
    }

    return (
        <div className={styles.notFound}>
            <span>😔</span>
            <div>
                <p>404</p>
                <p>Page not found</p>
            </div>
            <PrimaryButton onClick={handleNavigate}>Back To Home</PrimaryButton>
        </div>
    );
};

export default NotFound;
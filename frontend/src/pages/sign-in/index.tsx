import styles from './styles.module.scss'
import {Link} from "react-router-dom";
import Input from "../../shared/UIKit/input";

const App = () => {
    return (
        <div className={styles.page}>
            <div className={styles.auth}>
                <h3>SIGN IN</h3>
                <form className={styles.form}>
                    <Input placeholder='Name' type="text"/>
                    <Input placeholder='Password' type="password"/>
                    <Link to='/'>
                        <button
                            type='submit'
                        >
                            Continue
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default App;
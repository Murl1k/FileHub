import styles from './styles.module.scss';
import {ButtonHTMLAttributes, FC} from "react";

const OptionButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {
    return (
        <button {...props} className={styles.optionButton}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default OptionButton;
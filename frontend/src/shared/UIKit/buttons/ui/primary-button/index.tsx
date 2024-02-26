import styles from './styles.module.scss'
import {ButtonHTMLAttributes, FC} from "react";

const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={styles.primaryButton}>
            {children}
        </button>
    );
};

export default PrimaryButton;
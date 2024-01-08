import {ButtonHTMLAttributes, FC} from "react";
import styles from "./styles.module.scss"

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={styles.button}>
            {children}
        </button>
    );
};

export default Button;
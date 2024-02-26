import styles from "./styles.module.scss"
import {ButtonHTMLAttributes, FC} from "react";

const HeaderButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={styles.headerButton}>
            {children}
        </button>
    );
};

export default HeaderButton;
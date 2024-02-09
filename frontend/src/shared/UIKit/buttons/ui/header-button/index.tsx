import {ButtonHTMLAttributes, FC} from "react";
import styles from "./styles.module.scss"

const HeaderButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={styles.headerButton}>
            {children}
        </button>
    );
};

export default HeaderButton;
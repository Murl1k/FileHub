import styles from './styles.module.scss'
import {FC, HTMLAttributes} from "react";

const PopupTemplate: FC<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props} className={styles.popup}>
            {children}
        </div>
    );
};

export default PopupTemplate;
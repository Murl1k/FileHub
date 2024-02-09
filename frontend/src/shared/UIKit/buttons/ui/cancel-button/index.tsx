import styles from './styles.module.scss';
import {ButtonHTMLAttributes, FC} from "react";

const CancelButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {
    return (
        <button {...props} className={styles.cancelButton}>
            Cancel
        </button>
    );
};

export default CancelButton;
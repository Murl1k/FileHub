import {FC, InputHTMLAttributes} from "react";
import styles from "./styles.module.scss"

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({...props}) => {
    return (
        <input {...props} className={styles.input}/>
    );
};

export default Input;
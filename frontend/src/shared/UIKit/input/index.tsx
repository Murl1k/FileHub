import styles from "./styles.module.scss"
import {FC, InputHTMLAttributes} from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({...props}) => {
    return (
        <input {...props} className={styles.input}/>
    );
};

export default Input;
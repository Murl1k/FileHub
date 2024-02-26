import styles from './styles.module.scss'
import {FC} from "react";

const CloseButton: FC<{ onClick: () => void }> = ({onClick}) => {
    return (
        <div className={styles.closeButton} onClick={onClick}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="none" d="M5 5L19 19M5 19L19 5" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"></path>
                </g>
            </svg>
        </div>
    );
};

export default CloseButton;
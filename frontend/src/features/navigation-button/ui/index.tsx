import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import {FC} from "react";

const NavigationButton: FC<{ parentFolder: string | undefined }> = ({parentFolder}) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        if (parentFolder === null) {
            navigate('/')
        } else {
            navigate(`/folder/${parentFolder}`)
        }
    }

    return (
        <div
            onContextMenu={e => e.stopPropagation()}
            onDoubleClick={handleNavigate}
            className={styles.navigate}
        >
            <div>
                <button>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div>
            </div>
        </div>
    );
};

export default NavigationButton;
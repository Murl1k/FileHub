import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import {FC} from "react";
import {OptionButton} from "../../../shared/UIKit/buttons";

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
                <OptionButton/>
            </div>
            <div>
            </div>
        </div>
    );
};

export default NavigationButton;
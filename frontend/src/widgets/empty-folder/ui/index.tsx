import styles from './styles.module.scss';
import {folderIcon} from "../../../app/assets/images";

const EmptyFolder = () => {
    return (
        <div className={styles.emptyFolder}>
            <img src={folderIcon} alt="folder"/>
            <p>Empty folder 😢</p>
        </div>
    );
};

export default EmptyFolder;
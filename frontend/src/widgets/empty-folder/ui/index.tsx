import styles from './styles.module.scss';
import {FolderSvg} from "../../../app/assets/images";

const EmptyFolder = () => {
    return (
        <div className={styles.emptyFolder}>
            <FolderSvg/>
            <p>Empty folder 😢</p>
        </div>
    );
};

export default EmptyFolder;
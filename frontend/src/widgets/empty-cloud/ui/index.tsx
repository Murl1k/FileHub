import styles from './styles.module.scss';
import {FolderSvg} from "../../../app/assets/images";

const EmptyCloud = () => {
    return (
        <div className={styles.emptyCloud}>
            <FolderSvg/>
            <p>Empty Cloud 😢</p>
        </div>
    );
};

export default EmptyCloud;
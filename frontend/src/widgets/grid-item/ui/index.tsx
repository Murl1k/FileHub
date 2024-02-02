import styles from './styles.module.scss'
import {fileIcon, folderIcon} from "../../../app/assets/images";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {FC} from "react";
import {IMergedData} from "../../../shared/types";

const GridItem: FC<{ item: IMergedData }> = ({item}) => {
    return (
        <>
            <div className={styles.itemInfo}>
                <div className={styles.itemHeadline}>
                    <img
                        height='40'
                        width='40'
                        src={item.title ? folderIcon : fileIcon}
                        alt="item"
                    />
                </div>
                <h4>{item.name ? item.name : item.title}</h4>
                <p>last updated at<br/>{new Date(item.updated_at).toLocaleString()}</p>
            </div>
            <div className={styles.itemFooter}>
                <h5>{SizeCalculate(item.size)}</h5>
                <span>{item.is_public ? 'Public' : 'Private'}</span>
            </div>
        </>
    );
};

export default GridItem;
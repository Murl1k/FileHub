import styles from './styles.module.scss'
import {FC} from "react";
import {FolderSvg, SharedSvg} from "../../../../app/assets/images";
import {renderFileTypeIcon} from "../../model/render-file-type-icon.tsx";
import {SizeCalculate} from "../../../../shared/lib/size-calculate.ts";
import {IMergedData} from "../../../../shared/types";

const GridItem: FC<{ item: IMergedData }> = ({item}) => {
    return (
        <>
            <div className={styles.itemInfo}>
                <div className={styles.itemHeadline}>
                    {item.title ? item.is_public ? <SharedSvg/> : <FolderSvg/> : renderFileTypeIcon(item.name)}
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
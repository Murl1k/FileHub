import styles from "./styles.module.scss";
import {folderIcon} from '../../../app/assets/images'
import {FC, HTMLAttributes} from "react";
import {IItem} from "../../main/ui";

interface IGridItem extends HTMLAttributes<HTMLDivElement> {
    item: IItem
}

const GridItem: FC<IGridItem> = ({item, ...props}) => {
    return (
        <div {...props} className={styles.item}>
            <div style={{padding: '20px'}}>
                <div className={styles.itemHeadline}>
                    <img height='40' width='40' src={folderIcon} alt="folder"/>
                    <div style={{height: 'max-content'}}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <h4>{item.title}</h4>
                <p>{item.files} files</p>
            </div>
            <div className={styles.itemFooter}>
                <h5>{item.size} Mb</h5>
                <img src="" alt=""/>
            </div>
        </div>
    );
};

export default GridItem;
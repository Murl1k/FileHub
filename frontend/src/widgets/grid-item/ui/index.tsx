import styles from "./styles.module.scss";
import {folderIcon} from '../../../app/assets/images'
import {FC, HTMLAttributes, MouseEventHandler} from "react";
import {IFolderData} from "../../../shared/types";
import {Link} from "react-router-dom";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";

interface IGridItem extends HTMLAttributes<HTMLAnchorElement> {
    item: IFolderData
    handleClick: MouseEventHandler<HTMLDivElement>
}

const GridItem: FC<IGridItem> = ({item, handleClick, ...props}) => {
    return (
        <Link {...props} to={`/folder/${item.id}`} className={styles.item}>
            <div style={{padding: '20px'}}>
                <div className={styles.itemHeadline}>
                    <img height='40' width='40' src={folderIcon} alt="folder"/>
                    <div onClick={handleClick} style={{height: 'max-content'}}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <h4>{item.title}</h4>
                <p>last updated at<br/>{new Date(item.updated_at).toLocaleString()}</p>
            </div>
            <div className={styles.itemFooter}>
                <h5>{SizeCalculate(item.size)}</h5>
                <img src="" alt=""/>
            </div>
        </Link>
    );
};

export default GridItem;
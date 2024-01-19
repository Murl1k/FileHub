import styles from "./styles.module.scss";
import {FC, HTMLAttributes} from "react";
import {folderIcon} from "../../../app/assets/images";
import {IFolderData} from "../../../shared/types";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";

interface IListItem extends HTMLAttributes<HTMLDivElement> {
    item: IFolderData
}

const ListItem: FC<IListItem> = ({item, ...props}) => {
    return (
        <div {...props} className={styles.container}>
            <div className={styles.item}>
                <div>
                    <img height='40' width='40' src={folderIcon} alt="folder"/>
                    <h4>{item.title}</h4>
                </div>
                <div>
                    <h5>{SizeCalculate(item.size)}</h5>
                    <p>Folder</p>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
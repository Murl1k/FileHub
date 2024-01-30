import styles from "./styles.module.scss";
import {FC} from "react";
import {fileIcon, folderIcon} from "../../../app/assets/images";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {ItemTemplate} from "../../../features/item-template";
import {IItem} from "../../../shared/types";

const ListItem: FC<IItem> = ({item, isActive, setIsActive, isGrid}) => {

    const templateProps = {
        setIsActive,
        isActive,
        item,
        isGrid,
        id: item.id,
        title: item.title,
        isActiveId: isActive.id
    }

    return (
        <div className={styles.container}>
            <ItemTemplate itemProps={templateProps}>
                <div>
                    <img height='40' width='40' src={item.title ? folderIcon : fileIcon} alt="folder"/>
                    <h4>{item.title ? item.title : item.name}</h4>
                </div>
                <div style={{marginRight: '35px'}}>
                    <h5>{SizeCalculate(item.size)}</h5>
                    <p>{item.title ? 'Folder' : 'File'}</p>
                </div>
            </ItemTemplate>
        </div>
    );
};

export default ListItem;
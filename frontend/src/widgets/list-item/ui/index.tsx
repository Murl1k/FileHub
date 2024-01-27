import styles from "./styles.module.scss";
import {FC, useState} from "react";
import {fileIcon, folderIcon} from "../../../app/assets/images";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {FilesMenu} from "../../../features/files-menu";
import {IItem} from "../../../shared/types/copy.interface.ts";
import {ItemTemplate} from "../../item-template";

const ListItem: FC<IItem> = ({item, isActive, setIsActive}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isClicked, setIsClicked] = useState(false);

    const itemProps = {
        id: item.id,
        title: item.title,
        isActiveId: isActive.id,
        setIsClicked,
        setIsActive
    }

    return (
        <ItemTemplate
            itemProps={itemProps}
            className={styles.listItem}
        >
            {isOpen && <FilesMenu item={item} stateAction={setIsOpen}/>}
            <div className={styles.container}>
                <div
                    className={isClicked && isActive.status && isActive.id === item.id ?
                        `${styles.item} ${styles.active}` :
                        styles.item}
                >
                    <div>
                        <img height='40' width='40' src={item.title ? folderIcon : fileIcon} alt="folder"/>
                        <h4>{item.title ? item.title : item.name}</h4>
                    </div>
                    <div>
                        <div>
                            <h5>{SizeCalculate(item.size)}</h5>
                            <p>{item.title ? 'Folder' : 'File'}</p>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault()
                                setIsOpen(!isOpen)
                            }}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </ItemTemplate>
    );
};

export default ListItem;
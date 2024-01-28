import styles from "./styles.module.scss";
import {FC, MouseEvent, useState} from "react";
import {fileIcon, folderIcon} from "../../../app/assets/images";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {ContextMenuItem} from "../../../features/context-menu";
import {ItemTemplate} from "../../item-template";
import {ISelectionBarProps} from "../../../features/selection-bar";

const ListItem: FC<ISelectionBarProps> = ({item, isActive, setIsActive}) => {

    const [isOpen, setIsOpen] = useState({
        show: false,
        x: 0,
        y: 0
    })
    const [isClicked, setIsClicked] = useState(false);

    const itemProps = {
        id: item.id,
        title: item.title,
        isActiveId: isActive.id,
        setIsClicked,
        setIsActive
    }

    const handleRightClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setIsOpen({
            show: !isOpen.show,
            x: e.pageX,
            y: e.pageY
        })
    }

    return (
        <ItemTemplate
            itemProps={itemProps}
            className={styles.listItem}
            style={!isOpen.x ? {position: 'relative'} : {}}
        >
            {isOpen.show && <ContextMenuItem item={item} state={isOpen} stateAction={setIsOpen}/>}
            <div className={styles.container}>
                <div
                    onContextMenu={handleRightClick}
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
                                setIsOpen({
                                    show: !isOpen.show,
                                    x: 0,
                                    y: 0
                                })
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
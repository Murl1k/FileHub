import styles from './styles.module.scss'
import {fileIcon, folderIcon} from "../../../app/assets/images";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {FC, MouseEvent, useState} from "react";
import {ContextMenuItem} from "../../../features/context-menu";
import {ItemTemplate} from "../../item-template";
import {ISelectionBarProps} from "../../../features/selection-bar";

const GridItem: FC<ISelectionBarProps> = ({item, isActive, setIsActive}) => {

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
            style={!isOpen.x ? {position: 'relative'} : {}}
            onContextMenu={handleRightClick}
            itemProps={itemProps}
            className={isClicked && isActive.status && isActive.id === item.id ?
                `${styles.gridItem} ${styles.active}` :
                styles.gridItem}
        >
            {isOpen.show && <ContextMenuItem item={item} state={isOpen} stateAction={setIsOpen}/>}
            <div style={{padding: '20px'}}>
                <div className={styles.itemHeadline}>
                    <img
                        height='40'
                        width='40'
                        src={item.title ? folderIcon : fileIcon}
                        alt="item"
                    />
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
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
                <h4>{item.name ? item.name : item.title}</h4>
                <p>last updated at<br/>{new Date(item.updated_at).toLocaleString()}</p>
            </div>
            <div className={styles.itemFooter}>
                <h5>{SizeCalculate(item.size)}</h5>
                <span>{item.is_public ? 'Public' : 'Private'}</span>
            </div>
        </ItemTemplate>
    );
};

export default GridItem;
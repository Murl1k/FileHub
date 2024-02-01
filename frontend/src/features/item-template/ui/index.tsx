import styles from "./styles.module.scss";
import {Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IIsActive} from "../../selection-bar";
import {ContextMenuItem} from "../../context-menu";
import {IMergedData} from "../../../shared/types";

interface IItemTemplate extends HTMLAttributes<HTMLDivElement> {
    itemProps: {
        isActive: IIsActive
        isGrid: boolean
        setIsActive: Dispatch<SetStateAction<IIsActive>>
        item: IMergedData
    }
}

const ItemTemplate: FC<IItemTemplate> = ({children, itemProps, ...props}) => {

    const {
        isActive,
        isGrid,
        setIsActive,
        item
    } = itemProps

    const navigate = useNavigate()

    const [isClicked, setIsClicked] = useState(false);
    const [isOpen, setIsOpen] = useState({
        show: false,
        x: 0,
        y: 0
    })

    const handleRightClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setIsOpen({
            show: true,
            x: e.pageX,
            y: e.pageY
        })
    }

    const handleSingleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsClicked(true);

        if (isActive.id !== item.id) {
            setIsActive({status: true, id: item.id, isFolder: Boolean(item.title)})
        }
    };

    const handleDoubleClick = () => {
        if (item.title) {
            navigate(`/folder/${item.id}`)
            setIsActive({
                status: false,
                id: '',
                isFolder: false
            })
        }
    };

    const condition = isClicked && isActive.status && isActive.id === item.id

    const templateClassnames = () => {
        return isGrid
            ? condition ? `${styles.gridItem} ${styles.active}` : styles.gridItem
            : condition ? `${styles.listItem} ${styles.activeList}` : styles.listItem;
    };

    return (
        <div
            {...props}
            onClick={handleSingleClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleRightClick}
            className={templateClassnames()}
            style={!isOpen.x ? {position: 'relative'} : {}}
        >
            {children}
            <div style={isGrid ? {position: 'relative'} : {position: 'absolute'}}>
                <div
                    style={isOpen.x ? {right: '35px'} : {}}
                    className={styles.contextMenuBtn}
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
            {isOpen.show && <ContextMenuItem item={item} state={isOpen} stateAction={setIsOpen}/>}
        </div>
    );
};

export default ItemTemplate;
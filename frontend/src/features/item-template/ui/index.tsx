import styles from "./styles.module.scss";
import {FC, HTMLAttributes, MouseEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ContextMenuItem, initialContextState, setContextMenu} from "../../context-menu";
import {IMergedData} from "../../../shared/types";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {initialTemplateState, setIsActive} from "../";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {PrivacyPopup, setIsFoldersOpen} from "../../popup";

interface IItemTemplate extends HTMLAttributes<HTMLDivElement> {
    itemProps: {
        item: IMergedData
        isGrid: boolean
    }
}

const ItemTemplate: FC<IItemTemplate> = ({children, itemProps, ...props}) => {

    const {
        isGrid,
        item
    } = itemProps

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isClicked, setIsClicked] = useState(false);

    const {isPrivacyOpen, isFoldersOpen} = useAppSelector(state => state.popup)
    const {type, x} = useAppSelector(state => state.contextMenu)
    const {id, status} = useAppSelector(state => state.itemTemplate)

    const setActiveState = {
        status: true,
        id: item.id,
        isFolder: Boolean(item.title)
    }

    const handleRightClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(setContextMenu({
            type: "item",
            x: e.pageX,
            y: e.pageY
        }))

        if (id !== item.id || !status) {
            dispatch(setIsActive(setActiveState))
        }

        setIsClicked(true)
    }

    const handleClickTemplate = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsClicked(true);

        if (id !== item.id || !status) {
            dispatch(setIsActive(setActiveState))
        }

        isFoldersOpen && dispatch(setIsFoldersOpen(false))
    }

    const handleSingleClick = (e: MouseEvent<HTMLDivElement>) => {
        handleClickTemplate(e)

        type !== 'initial' && dispatch(setContextMenu(initialContextState))
    };

    const handleDoubleClick = () => {
        if (item.title) {
            navigate(`/folder/${item.id}`)
            dispatch(setIsActive(initialTemplateState))
        }
    };

    const condition = isClicked && status && id === item.id

    const templateClassnames = () => {
        return isGrid
            ? condition ? `${styles.gridItem} ${styles.active}` : styles.gridItem
            : condition ? `${styles.listItem} ${styles.activeList}` : styles.listItem;
    };

    return (
        <>
            <div
                {...props}
                onClick={handleSingleClick}
                onDoubleClick={handleDoubleClick}
                onContextMenu={handleRightClick}
                className={templateClassnames()}
                style={!x ? {position: 'relative'} : {}}
            >
                {children}
                <div style={isGrid ? {position: 'relative'} : {position: 'absolute'}}>
                    <div
                        style={x ? {right: '35px'} : {}}
                        className={styles.contextMenuBtn}
                        onClick={(e) => {
                            handleClickTemplate(e)

                            if (type !== 'item' || x !== 0) {
                                dispatch(setContextMenu({
                                    type: "item",
                                    x: 0,
                                    y: 0
                                }))
                            }
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {type === 'item' && id === item.id && <ContextMenuItem item={item}/>}
            </div>
            {isPrivacyOpen && id === item.id &&
                <PrivacyPopup
                    id={item.id}
                    title={item.title}
                    folder={item.folder}
                    is_public={item.is_public}
                />
            }
        </>
    );
};

export default ItemTemplate;
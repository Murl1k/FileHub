import styles from "./styles.module.scss";
import {Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ContextMenuItem, IContextMenu} from "../../context-menu";
import {IMergedData} from "../../../shared/types";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {setIsActive} from "../";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";

interface IItemTemplate extends HTMLAttributes<HTMLDivElement> {
    itemProps: {
        item: IMergedData
        isGrid: boolean
        state: IContextMenu
        stateAction: Dispatch<SetStateAction<IContextMenu>>
    }
}

const ItemTemplate: FC<IItemTemplate> = ({children, itemProps, ...props}) => {

    const {
        isGrid,
        item,
        state,
        stateAction
    } = itemProps

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isClicked, setIsClicked] = useState(false);

    const {id, status} = useAppSelector(state => state.itemTemplate)

    const handleRightClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        stateAction({
            show: true,
            x: e.pageX,
            y: e.pageY
        })

        dispatch(setIsActive({
            status: true,
            id: item.id,
            isFolder: Boolean(item.title)
        }))

        setIsClicked(true)
    }

    const handleSingleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsClicked(true);

        if (id !== item.id) {
            dispatch(setIsActive({status: true, id: item.id, isFolder: Boolean(item.title)}))
        }
    };

    const handleDoubleClick = () => {
        if (item.title) {
            navigate(`/folder/${item.id}`)
            dispatch(setIsActive({
                status: false,
                id: '',
                isFolder: false
            }))
        }
    };

    const condition = isClicked && status && id === item.id

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
            style={!state.x ? {position: 'relative'} : {}}
        >
            {children}
            <div style={isGrid ? {position: 'relative'} : {position: 'absolute'}}>
                <div
                    style={state.x ? {right: '35px'} : {}}
                    className={styles.contextMenuBtn}
                    onClick={(e) => {
                        e.stopPropagation()

                        stateAction({
                            show: !state.show,
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
            {state.show && id === item.id && <ContextMenuItem item={item} state={state} stateAction={stateAction}/>}
        </div>
    );
};

export default ItemTemplate;
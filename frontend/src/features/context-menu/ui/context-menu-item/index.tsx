import styles from '../styles.module.scss'
import {FC, HTMLAttributes, MouseEvent, useRef} from 'react'
import {IMergedData} from "../../../../shared/types";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, initialContextState, setContextMenu} from "../../";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {initialTemplateState, setIsActive} from "../../../item-template";

interface IContextMenuItem extends HTMLAttributes<HTMLDivElement> {
    item: IMergedData
    index: number
    maxIndex: number
}

const ContextMenuItem: FC<IContextMenuItem> = ({children, item, index, maxIndex}) => {

    const dispatch = useAppDispatch()

    const contextMenuRef = useRef<HTMLDivElement>(null)

    const state = useAppSelector(state => state.contextMenu)

    useOutsideClick(contextMenuRef, () => {
        dispatch(setContextMenu(initialContextState))
        dispatch(setIsActive(initialTemplateState))
    }, state.type === 'item')

    const handleCloseContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(setContextMenu(initialContextState))
    }

    const contextMenuStyles = () => {
        const defaultPosition: { right: string, top?: string, bottom?: string } = {
            top: '45px',
            right: '45px'
        }

        const position = state.x ?
            item.title ?
                contextMenuPosition(state.x, state.y, 172, 307) :
                contextMenuPosition(state.x, state.y, 172, 205) :
            defaultPosition

        if (index >= maxIndex) {
            delete defaultPosition.top
            defaultPosition.bottom = '40px'
            defaultPosition.right = '40px'
        }

        return position
    }

    return (
        <div
            onContextMenu={handleCloseContextMenu}
            ref={contextMenuRef}
            style={contextMenuStyles()}
            className={styles.contextMenu}
        >
            {children}
        </div>
    );
};

export default ContextMenuItem;
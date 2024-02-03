import styles from './styles.module.scss';
import {MouseEvent, useRef} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, IContextMenu, initialContextState, setContextMenu} from "../../";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {PasteButton} from "../../../paste-button";
import {setIsFilesOpen, setIsFoldersOpen} from "../../../popup";
import {PayloadAction} from "@reduxjs/toolkit";

const ContextMenuMain = () => {

    const dispatch = useAppDispatch()

    const contextMenu = useAppSelector(state => state.contextMenu)
    const {isFoldersOpen} = useAppSelector(state => state.popup)

    const contextMenuRef = useRef<HTMLDivElement>(null)

    useOutsideClick<PayloadAction<IContextMenu>>(contextMenuRef, dispatch, setContextMenu(initialContextState), contextMenu.type === 'main')

    const handleOpenFolders = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(setIsFoldersOpen(true))

        setContextMenu(initialContextState)
    }

    const handleOpenFiles = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(setIsFilesOpen(true))

        setContextMenu(initialContextState)

        if (isFoldersOpen) {
            dispatch(setIsFoldersOpen(false))
        }
    }

    return (
        <div
            ref={contextMenuRef}
            className={styles.contextMenu}
            style={contextMenuPosition(contextMenu.x, contextMenu.y, 83)}
        >
            <button onClick={handleOpenFolders}>Add folder</button>
            <button onClick={handleOpenFiles}>Add files</button>
            <PasteButton/>
        </div>
    );
};

export default ContextMenuMain;
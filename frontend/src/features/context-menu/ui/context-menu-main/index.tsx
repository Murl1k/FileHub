import styles from './styles.module.scss';
import {FC, MouseEvent, useRef} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, IContextMenu, IContextMenuMain, setIsFilesOpen, setIsFoldersOpen} from "../../";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {PasteButton} from "../../../paste-button";

const ContextMenuMain: FC<IContextMenuMain> = ({contextMenu, setContextMenu}) => {

    const dispatch = useAppDispatch()

    const {isFoldersOpen} = useAppSelector(state => state.contextMenuMain)

    const contextMenuRef = useRef<HTMLDivElement>(null)

    useOutsideClick<IContextMenu>(contextMenuRef, setContextMenu, {show: false, x: 0, y: 0}, contextMenu.show)

    const handleOpenFolders = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(setIsFoldersOpen(true))

        setContextMenu({
            show: false,
            x: 0,
            y: 0
        })
    }

    const handleOpenFiles = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(setIsFilesOpen(true))

        setContextMenu({
            show: false,
            x: 0,
            y: 0
        })

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
            <PasteButton setContextMenu={setContextMenu}/>
        </div>
    );
};

export default ContextMenuMain;
import styles from './styles.module.scss';
import {Dispatch, FC, MouseEvent, SetStateAction, useRef} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {IContextMenu} from "../../model/types.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {setIsFilesOpen} from "../../../../shared/api/files/files.slice.ts";
import {setIsFoldersOpen} from "../../../../shared/api/folders/folders.slice.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";

interface IContextMenuMain {
    contextMenu: IContextMenu
    setContextMenu: Dispatch<SetStateAction<IContextMenu>>
}

const ContextMenuMain: FC<IContextMenuMain> = ({contextMenu, setContextMenu}) => {

    const dispatch = useAppDispatch()

    const {isFoldersOpen} = useAppSelector(state => state.folders)

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
        <div ref={contextMenuRef} className={styles.contextMenu} style={{
            top: `calc(${contextMenu.y}px - 83px)`,
            left: `calc(${contextMenu.x}px - 280px)`
        }}>
            <button onClick={handleOpenFolders}>Add folder</button>
            <button onClick={handleOpenFiles}>Add files</button>
        </div>
    );
};

export default ContextMenuMain;
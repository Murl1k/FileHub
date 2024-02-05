import styles from './styles.module.scss';
import {ChangeEvent, FC, MouseEvent, useRef, useState} from "react";
import {CloseBtn} from "../../../close-btn";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {setIsFolderRenameOpen} from "../../model";
import {useRenameFolderMutation} from "../../../../shared/api/api.ts";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import PopupTemplate from "../template";

const RenamePopup: FC<{ id: string }> = ({id}) => {

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')

    const {isFolderRenameOpen} = useAppSelector(state => state.popup)

    const [updateResult] = useRenameFolderMutation()

    const handleCloseRename = () => {
        dispatch(setIsFolderRenameOpen(false))
    }

    const renameRef = useRef<HTMLDivElement>(null)
    useOutsideClick(renameRef, handleCloseRename, isFolderRenameOpen)

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleFolderRename = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        updateResult({id: id, title: title})
        dispatch(setIsFolderRenameOpen(false))
    }

    return (
        <PopupTemplate onContextMenu={e => e.stopPropagation()}>
            <div ref={renameRef} className={styles.rename}>
                <div>
                    <h3>Rename a folder</h3>
                    <CloseBtn onClick={handleCloseRename}/>
                </div>
                <div>
                    <input placeholder="Enter a new title" value={title} onChange={handleTitleChange} type="text"/>
                    <div>
                        <button onClick={handleCloseRename}>Cancel</button>
                        <button onClick={handleFolderRename}>Rename</button>
                    </div>
                </div>
            </div>
        </PopupTemplate>
    );
};

export default RenamePopup;
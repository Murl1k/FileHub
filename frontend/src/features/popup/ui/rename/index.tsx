import styles from './styles.module.scss';
import {ChangeEvent, FC, KeyboardEvent, MouseEvent, useRef, useState} from "react";
import {CloseBtn} from "../../../close-btn";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {IPopupTransition, setIsFolderRenameOpen} from "../../model";
import {useRenameFolderMutation} from "../../../../shared/api/api.ts";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import PopupTemplate from "../template";
import {transitionStyles} from "../../index.ts";

interface IRenamePopup extends IPopupTransition {
    id: string
}

const RenamePopup: FC<IRenamePopup> = ({id, transitionState}) => {

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

    const handleFolderRename = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()

        updateResult({id: id, title: title})
        dispatch(setIsFolderRenameOpen(false))
    }

    const onKeyDownRename = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            handleFolderRename(e)
        }
    }

    return (
        <PopupTemplate
            onContextMenu={e => e.stopPropagation()}
            style={transitionStyles[transitionState as keyof typeof transitionStyles]}
        >
            <div
                ref={renameRef}
                className={styles.rename}
                style={transitionStyles[transitionState as keyof typeof transitionStyles]}
            >
                <div>
                    <h3>Rename a folder</h3>
                    <CloseBtn onClick={handleCloseRename}/>
                </div>
                <div>
                    <input
                        placeholder="Enter a new title"
                        type="text"
                        autoFocus
                        value={title}
                        onChange={handleTitleChange}
                        onKeyDown={onKeyDownRename}
                    />
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
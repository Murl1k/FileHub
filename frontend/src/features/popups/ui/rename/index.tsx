import styles from './styles.module.scss';
import {ChangeEvent, FC, FormEvent, KeyboardEvent, useRef, useState} from "react";
import {getTransitionStyles, IPopupTransition, setIsFolderRenameOpen} from "../../model";
import {CloseButton} from "../../../close-button";
import PopupTemplate from "../template";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useRenameFolderMutation} from "../../../../shared/api";
import {useOutsideClick} from "../../../../shared/lib/hooks/useOutsideClick.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {CancelButton, PrimaryButton} from "../../../../shared/UIKit/buttons";
import Input from "../../../../shared/UIKit/input";

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

    const renameRef = useRef<HTMLFormElement>(null)
    useOutsideClick(renameRef, handleCloseRename, isFolderRenameOpen)

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleFolderRename = (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()

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
            style={getTransitionStyles(transitionState)}
        >
            <form
                ref={renameRef}
                className={styles.rename}
                style={getTransitionStyles(transitionState)}
                onSubmit={handleFolderRename}
            >
                <div>
                    <h3>Rename a folder</h3>
                    <CloseButton onClick={handleCloseRename}/>
                </div>
                <div>
                    <Input
                        placeholder="Enter a new title"
                        type="text"
                        autoFocus
                        value={title}
                        onChange={handleTitleChange}
                        onKeyDown={onKeyDownRename}
                    />
                    <div>
                        <CancelButton onClick={handleCloseRename}/>
                        <PrimaryButton type='submit'>Rename</PrimaryButton>
                    </div>
                </div>
            </form>
        </PopupTemplate>
    );
};

export default RenamePopup;
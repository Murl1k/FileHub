import styles from './styles.module.scss';
import {folderIcon} from '../../../../app/assets/images'
import {ChangeEvent, FC, FormEvent, KeyboardEvent, useRef, useState} from "react";
import {useAddFolderMutation} from "../../../../shared/api/api.ts";
import {useParams} from "react-router-dom";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {IPopup, IPopupAction} from "../../";

const FolderPopup: FC<IPopup> = ({state, stateAction}) => {

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')

    const {id} = useParams()

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick<IPopupAction>(popupRef, dispatch, stateAction(false), state)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const [updateResult] = useAddFolderMutation()

    const handleSubmit = (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        updateResult({
            title,
            parent_folder: id ? id : null
        })
        dispatch(stateAction(false))
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            handleSubmit(e)
        }
    }

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Escape') {
            dispatch(stateAction(false))
        }
    }

    return (
        <div className={styles.popup}>
            <form onSubmit={handleSubmit} onReset={() => dispatch(stateAction(false))} ref={popupRef}>
                <label>
                    <img src={folderIcon} alt="folder"/>
                    <input
                        type="text"
                        placeholder='Title'
                        autoFocus
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                    />
                </label>
                <div className={styles.btns}>
                    <button type='reset'>Cancel</button>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
};

export default FolderPopup;
import styles from './styles.module.scss';
import {folderIcon} from '../../../../app/assets/images'
import {ChangeEvent, FC, FormEvent, KeyboardEvent, useRef, useState} from "react";
import {useAddFolderMutation} from "../../../../shared/api/api.ts";
import {useParams} from "react-router-dom";
import {IPopup} from "../../../../shared/types";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";

const Folder: FC<IPopup> = ({state, stateAction}) => {

    const [title, setTitle] = useState('')

    const {id} = useParams()

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, stateAction, state)

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
        stateAction(false)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <div className={styles.popup}>
            <form onSubmit={handleSubmit} ref={popupRef}>
                <label>
                    <img src={folderIcon} alt="folder"/>
                    <input
                        type="text"
                        placeholder='Title'
                        autoFocus
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                    />
                </label>
                <div className={styles.btns}>
                    <button onClick={() => stateAction(false)}>Cancel</button>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
};

export default Folder;
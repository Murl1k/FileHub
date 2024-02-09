import styles from './styles.module.scss';
import {FolderSvg} from '../../../../app/assets/images'
import {ChangeEvent, FC, FormEvent, KeyboardEvent, useRef, useState} from "react";
import {useAddFolderMutation} from "../../../../shared/api/api.ts";
import {useParams} from "react-router-dom";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {IPopup, transitionStyles} from "../../";
import {CancelButton, PrimaryButton} from "../../../../shared/UIKit/buttons";

const FolderPopup: FC<IPopup> = ({state, stateAction, transitionState}) => {

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')

    const {id} = useParams()

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, () => dispatch(stateAction(false)), state)

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
        <div className={styles.popup} style={transitionStyles[transitionState as keyof typeof transitionStyles]}>
            <form onSubmit={handleSubmit} onReset={() => dispatch(stateAction(false))} ref={popupRef}
                  style={transitionStyles[transitionState as keyof typeof transitionStyles]}
            >
                <label>
                    <FolderSvg/>
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
                    <CancelButton type='reset'/>
                    <PrimaryButton type='submit'>Create</PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default FolderPopup;
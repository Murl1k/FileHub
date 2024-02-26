import styles from './styles.module.scss';
import {ChangeEvent, FC, FormEvent, KeyboardEvent, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {getTransitionStyles, IPopupTransition, setIsFoldersOpen} from "../../";
import {FolderSvg} from '../../../../app/assets/images'
import {useAddFolderMutation} from "../../../../shared/api";
import {useOutsideClick} from "../../../../shared/lib/hooks/useOutsideClick.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {CancelButton, PrimaryButton} from "../../../../shared/UIKit/buttons";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";

const FolderPopup: FC<IPopupTransition> = ({transitionState}) => {

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')

    const {isFoldersOpen} = useAppSelector(state => state.popup)

    const {id} = useParams()

    const popupRef = useRef<HTMLFormElement>(null)

    const handleCloseFoldersPopup = () => {
        dispatch(setIsFoldersOpen(false))
    }

    useOutsideClick(popupRef, handleCloseFoldersPopup, isFoldersOpen)

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
        handleCloseFoldersPopup()
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            handleSubmit(e)
        }
    }

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Escape') {
            handleCloseFoldersPopup()
        }
    }

    return (
        <div className={styles.popup} style={getTransitionStyles(transitionState)}>
            <form onSubmit={handleSubmit} onReset={handleCloseFoldersPopup} ref={popupRef}
                  style={getTransitionStyles(transitionState)}
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
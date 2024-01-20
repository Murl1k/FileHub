import styles from './styles.module.scss';
import {ChangeEvent, Dispatch, FC, HTMLAttributes, SetStateAction, useRef, useState} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {Transition} from "react-transition-group";
import {CloseBtn} from "../../../close-btn";
import {useAddFolderMutation} from "../../../../shared/api/api.ts";
import {useParams} from "react-router-dom";

interface IPopup extends HTMLAttributes<HTMLDivElement> {
    state: boolean
    stateAction: Dispatch<SetStateAction<boolean>>
}

const Folder: FC<IPopup> = ({state, stateAction}) => {

    const [title, setTitle] = useState('')

    const {id} = useParams()

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, stateAction, state)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const [updateResult] = useAddFolderMutation()

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateResult({
            title,
            parent_folder: id ? id : null
        })
        stateAction(false)
    }

    return (
        <Transition
            in={state}
            timeout={300}
            unmountOnExit={true}
        >
            {(animationState) => (
                <div className={`${styles.popup} ${styles[animationState]}`}>
                    <form onSubmit={handleSubmit} ref={popupRef}>
                        <CloseBtn onClick={() => stateAction(!state)}/>
                        <h2>Create a folder</h2>
                        <input
                            type="text"
                            placeholder='title'
                            onChange={handleChange}
                        />
                        <button type='submit'>Create a folder</button>
                    </form>
                </div>
            )}
        </Transition>
    );
};

export default Folder;
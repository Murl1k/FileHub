import styles from './styles.module.scss';
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {ChangeEvent, Dispatch, FC, HTMLAttributes, SetStateAction, useRef, useState} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {fetchAddFolder} from "../../../../shared/api/folder/folder.action.ts";
import {Transition} from "react-transition-group";
import {CloseBtn} from "../../../close-btn";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";

interface IPopup extends HTMLAttributes<HTMLDivElement> {
    state: boolean
    stateAction: Dispatch<SetStateAction<boolean>>
}

const Folder: FC<IPopup> = ({state, stateAction}) => {

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')

    const {current_folder} = useAppSelector(state => state.folder)

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, stateAction, state)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(fetchAddFolder({
            title,
            parent_folder: current_folder ? current_folder : null
        }))
        stateAction(false)
    }

    console.log(current_folder)

    return (
        <Transition
            in={state}
            timeout={300}
            unmountOnExit={true}
        >
            {(animationState) => (
                <div className={`${styles.popup} ${styles[animationState]}`}>
                    <form ref={popupRef}>
                        <CloseBtn onClick={() => stateAction(!state)}/>
                        <h2>Create a folder</h2>
                        <input
                            type="text"
                            placeholder='title'
                            onChange={handleChange}
                        />
                        <button onClick={handleSubmit}>Create a folder</button>
                    </form>
                </div>
            )}
        </Transition>
    );
};

export default Folder;
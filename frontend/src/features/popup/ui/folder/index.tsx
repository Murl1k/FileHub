import styles from './styles.module.scss';
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {Dispatch, FC, HTMLAttributes, SetStateAction, useRef} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {fetchAddFolder} from "../../../../shared/api/folder/folder.action.ts";
import {IFolder} from "../../../../shared/types";
import {Transition} from "react-transition-group";
import {CloseBtn} from "../../../close-btn";

interface IPopup extends HTMLAttributes<HTMLDivElement> {
    state: boolean
    stateAction: Dispatch<SetStateAction<boolean>>
}

const Folder: FC<IPopup> = ({state, stateAction}) => {

    const dispatch = useAppDispatch()

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, stateAction, state)

    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            title: '',
            parent_folder: null
        },
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IFolder> = (values) => {
        console.log(values)

        dispatch(fetchAddFolder(values))
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
                    <form onSubmit={handleSubmit(onSubmit)} ref={popupRef}>
                        <CloseBtn onClick={() => stateAction(!state)}/>
                        <h2>Create a folder</h2>
                        <input
                            type="text"
                            placeholder='title'
                            {...register('title', {required: true})}
                        />
                        <input
                            type="text"
                            placeholder='parent folder'
                            {...register('parent_folder')}
                        />
                        <button type='submit'>Create a folder</button>
                    </form>
                </div>
            )}
        </Transition>
    );
};

export default Folder;
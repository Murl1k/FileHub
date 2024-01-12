import styles from './styles.module.scss';
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {Dispatch, FC, SetStateAction, useRef} from "react";
import {useOutsideClick} from "../../../shared/lib/hooks/useClickOutside.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {IFolder} from "../../../shared/types/folder.interface.ts";
import {fetchAddFolder} from "../../../shared/api/folder/folder.action.ts";

const Popup: FC<{ state: boolean, stateAction: Dispatch<SetStateAction<boolean>> }> = ({state, stateAction}) => {

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
        <div className={styles.popup}>
            <form onSubmit={handleSubmit(onSubmit)} ref={popupRef}>
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
    );
};

export default Popup;
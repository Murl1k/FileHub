import styles from './styles.module.scss'
import {Transition} from "react-transition-group";
import {ChangeEvent, Dispatch, DragEventHandler, FC, SetStateAction, useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {CloseBtn} from "../../../close-btn";
import {fetchAddFiles, fetchGetFiles} from "../../../../shared/api/files/files.action.ts";

const Files: FC<{ state: boolean, stateAction: Dispatch<SetStateAction<boolean>> }> = ({state, stateAction}) => {

    const dispatch = useAppDispatch()

    const [files, setFiles] = useState<File[]>([])
    const [isDrag, setIsDrag] = useState(false)

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, stateAction, state)

    useEffect(() => {
        dispatch(fetchGetFiles())
    }, [dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files?.[0]) {
            setFiles([e.target.files[0]])
        }
    }

    const handleDrag: DragEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsDrag(true)
    }

    const handleLeave: DragEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsDrag(false)
    }

    const handleDrop: DragEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsDrag(false)
        if (e.dataTransfer.files[0]) {
            setFiles([e.dataTransfer.files[0]])
            // files.push(...e.dataTransfer.files)
        }
    }

    const handleReset = () => {
        setFiles([])
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData()

        data.append('file', files[0])
        // data.append('folder', '2EG7gpaYcyp5LzAwV9ys6j')
        console.log(data)

        dispatch(fetchAddFiles(data))
    }

    return (
        <Transition nodeRef={popupRef} in={state} timeout={300} unmountOnExit={true}>
            {(state) => (
                <div className={`${styles.popup} ${styles[state]}`}>
                    <form
                        className={!isDrag ? `${styles.uploadFiles}` : `${styles.uploadFiles} ${styles.drag}`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleLeave}
                        onDrop={handleDrop}
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                        ref={popupRef}
                        encType="multipart/form-data"
                    >
                        <CloseBtn onClick={() => stateAction(!state)}/>
                        <h3>Upload your files</h3>
                        <label>
                            <span>Press to upload</span>
                            <input name="file" type="file" onChange={handleChange}/>
                        </label>
                        {files.length > 0 && <div style={{marginTop: '20px'}}>
                            {files.map((item, i) => (
                                <div style={{
                                    overflow: 'hidden',
                                    width: '150px',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }} key={i}>
                                    {item.name}
                                </div>
                            ))}
                        </div>}
                        <div className={styles.btns}>
                            <button type='reset'>Reset</button>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </Transition>
    );
};

export default Files;
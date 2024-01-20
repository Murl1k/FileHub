import styles from './styles.module.scss'
import {Transition} from "react-transition-group";
import {ChangeEvent, Dispatch, DragEventHandler, FC, SetStateAction, useRef, useState} from "react";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {CloseBtn} from "../../../close-btn";
import {useAddFileMutation} from "../../../../shared/api/api.ts";
import {useParams} from "react-router-dom";

const Files: FC<{ state: boolean, stateAction: Dispatch<SetStateAction<boolean>> }> = ({state, stateAction}) => {

    const [files, setFiles] = useState<File[]>([])
    const [isDrag, setIsDrag] = useState(false)

    const {id} = useParams()

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, stateAction, state)

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
        }
    }

    const handleReset = () => {
        setFiles([])
    }

    const [updateResult] = useAddFileMutation()

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData()

        data.append('file', files[0])
        if (id) {
            data.append('folder', id)
        }
        console.log(data)

        updateResult(data)
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
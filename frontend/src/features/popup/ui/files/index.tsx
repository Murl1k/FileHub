import styles from './styles.module.scss'
import {ChangeEvent, Dispatch, DragEventHandler, FC, SetStateAction, useRef, useState} from "react";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {fetchAddFiles} from "../../../../shared/api/files/files.action.ts";
import {CloseBtn} from "../../../close-btn";

const Files: FC<{ state: boolean, stateAction: Dispatch<SetStateAction<boolean>> }> = ({state, stateAction}) => {

    const dispatch = useAppDispatch()

    const [files, setFiles] = useState<File[]>([])
    const [isDrag, setIsDrag] = useState(false)

    const popupRef = useRef<HTMLFormElement>(null)

    useOutsideClick(popupRef, stateAction, state)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFiles([...e.target.files])
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles([...e.dataTransfer.files])
            // files.push(...e.dataTransfer.files)
        }
    }

    const handleReset = () => {
        setFiles([])
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData()
        files.forEach(file => {
            data.append('file', file)
        })
        dispatch(fetchAddFiles({file: data}))
    }

    return (
        <div className={styles.popup}>
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
                <>
                    <label>
                        <span>Press to upload</span>
                        <input type="file" multiple={true} onChange={handleChange}/>
                    </label>
                    {files.length > 0 && <div style={{marginTop: '20px'}}>
                        {files.map((item, i) => (
                            <div key={i}>
                                {item.name}
                            </div>
                        ))}
                    </div>}
                </>
                <div className={styles.btns}>
                    <button type='reset'>Reset</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Files;
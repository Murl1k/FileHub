import styles from './styles.module.scss'
import {deleteIcon} from '../../../../app/assets/images/'
import {ChangeEvent, DragEventHandler, FC, useRef, useState} from "react";
import {CloseBtn} from "../../../close-btn";
import {useAddFileMutation} from "../../../../shared/api/api.ts";
import {useParams} from "react-router-dom";
import {SizeCalculate} from "../../../../shared/lib/size-calculate.ts";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {IPopup, IPopupAction} from "../../";

const Files: FC<IPopup> = ({state, stateAction}) => {

    const dispatch = useAppDispatch()

    const [files, setFiles] = useState<File[]>([])
    const [isDrag, setIsDrag] = useState(false)

    const {id} = useParams()

    const [updateResult] = useAddFileMutation()

    const popupRef = useRef<HTMLDivElement>(null)

    useOutsideClick<IPopupAction>(popupRef, dispatch, stateAction(false), state)

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
        <div className={styles.popup}>
            <div className={styles.container} ref={popupRef}>
                <div className={styles.popupHeadline}>
                    <h3>Upload your file</h3>
                    <CloseBtn onClick={() => dispatch(stateAction(false))}/>
                </div>
                <div style={{padding: '20px'}}>
                    <form
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleLeave}
                        onDrop={handleDrop}
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                    >
                        <div className={!isDrag ? styles.uploadFiles : `${styles.uploadFiles} ${styles.drag}`}>
                            <svg height="40" width="40" viewBox="0 0 1024 1024" className="icon"
                                 xmlns="http://www.w3.org/2000/svg" fill="#ccc"
                                 stroke="#ccc">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill="#ccc"
                                          d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0164 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 01512 192a239.872 239.872 0 01235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 01-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"></path>
                                </g>
                            </svg>
                            <div className={styles.browse}>
                                <p>Drag and drop or&nbsp;</p>
                                <label>
                                    <span>browse</span>
                                    <input name="file" type="file" onChange={handleChange}/>
                                </label>
                            </div>
                        </div>
                        {files.length > 0 && <div style={{marginTop: '20px'}}>
                            {files.map((item, i) => (
                                <div className={styles.file} key={i}>
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{SizeCalculate(item.size)}</p>
                                    </div>
                                    <button type='reset'>
                                        <img src={deleteIcon} alt="trash"/>
                                    </button>
                                </div>
                            ))}
                        </div>}
                        <div className={styles.btns}>
                            <button onClick={() => dispatch(stateAction(false))}>Cancel</button>
                            <button type='submit'>Add files</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Files;
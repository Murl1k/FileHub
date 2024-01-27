import styles from './styles.module.scss';
import {getFolderId} from "../../../shared/api/folders/folders.slice.ts";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {FC, useRef} from "react";
import {useCopyFileMutation, useCopyFolderMutation} from "../../../shared/api/api.ts";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {IIsActive} from "../../../shared/types/copy.interface.ts";

const Copy: FC<{ isActive: IIsActive }> = ({isActive}) => {

    const dispatch = useAppDispatch()

    const {id} = useParams() as { id: string }

    const copyRef = useRef<HTMLDivElement>(null)

    const {isFolder, id: folderId} = useAppSelector(state => state.folders)

    const [updateFolderResult] = useCopyFolderMutation()
    const [updateFileResult] = useCopyFileMutation()

    const handleGetFolderId = () => {
        if (folderId !== isActive.id) {
            dispatch(getFolderId({id: isActive.id, isFolder: isActive.isFolder}))
        }
    }

    const handleCopy = () => {
        if (isFolder) {
            updateFolderResult({id: folderId, folder: id})
        } else {
            updateFileResult({id: folderId, folder: id})
        }
    }

    return (
        <div className={styles.copy} ref={copyRef}>
            <button onClick={handleGetFolderId}>Copy</button>
            <button onClick={handleCopy}>Paste</button>
        </div>
    );
};

export default Copy;
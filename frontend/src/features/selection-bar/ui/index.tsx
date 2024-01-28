import styles from './styles.module.scss';
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {FC} from "react";
import {useCopyFileMutation, useCopyFolderMutation} from "../../../shared/api/api.ts";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryActionCreatorResult,
    QueryDefinition
} from "@reduxjs/toolkit/query";
import {IFileData, IFolderData} from "../../../shared/types";
import {IIsActive} from "../";
import {getItemId} from "../model/selection-bar.slice.ts";

interface ISelectionBar {
    isActive: IIsActive
    filesRefetch: () => QueryActionCreatorResult<QueryDefinition<string, BaseQueryFn<string |
        FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>,
        "File", IFileData[], "api">>
    foldersRefetch: () => QueryActionCreatorResult<QueryDefinition<string, BaseQueryFn<string |
        FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>,
        "Folder", IFolderData[], "api">>
}


const SelectionBar: FC<ISelectionBar> = ({isActive, filesRefetch, foldersRefetch}) => {

    const dispatch = useAppDispatch()

    const {id} = useParams() as { id: string }

    const {isFolder, id: folderId} = useAppSelector(state => state.selectionBar)

    const [updateFolderResult] = useCopyFolderMutation()
    const [updateFileResult] = useCopyFileMutation()

    const handleCopy = () => {
        if (folderId !== isActive.id) {
            dispatch(getItemId({id: isActive.id, isFolder: isActive.isFolder}))
        }
    }

    const handlePaste = async () => {
        if (isFolder) {
            await updateFolderResult({id: folderId, folder: id})
            setTimeout(() => {
                foldersRefetch()
            }, 200)
        } else {
            await updateFileResult({id: folderId, folder: id})
            setTimeout(() => {
                filesRefetch()
            }, 200)
        }
    }

    return (
        <div className={styles.selectionBar}>
            <button onClick={handleCopy}>Copy</button>
            <button onClick={handlePaste}>Paste</button>
        </div>
    );
};

export default SelectionBar;
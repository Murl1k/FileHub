import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {Dispatch, FC, SetStateAction} from "react";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryActionCreatorResult,
    QueryDefinition
} from "@reduxjs/toolkit/query";
import {IFileData, IFolderData} from "../../../shared/types";
import {useCopyFileMutation, useCopyFolderMutation} from "../../../shared/api/api.ts";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {getItemId, IIsActive} from "../";
import {FeatureButtons} from "../../feature-buttons";

interface ISelectionBar {
    selectionProps: {
        isActive: IIsActive
        setIsActive: Dispatch<SetStateAction<IIsActive>>
        name: string
        title: string
        url: string
        itemId: string
        filesRefetch: () => QueryActionCreatorResult<QueryDefinition<string, BaseQueryFn<string |
            FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>,
            "File", IFileData[], "api">>
        foldersRefetch: () => QueryActionCreatorResult<QueryDefinition<string, BaseQueryFn<string |
            FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>,
            "Folder", IFolderData[], "api">>
    }
}


const SelectionBar: FC<ISelectionBar> = ({selectionProps}) => {

    const {
        isActive,
        setIsActive,
        name,
        title,
        url,
        itemId,
        filesRefetch,
        foldersRefetch
    } = selectionProps

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
            }, 250)
        } else {
            await updateFileResult({id: folderId, folder: id})
            setTimeout(() => {
                filesRefetch()
            }, 250)
        }
    }

    const featureButtonsProps = {
        title,
        url,
        name,
        id: itemId,
        stateAction: setIsActive,
    }

    return (
        <>
            {isActive.id === itemId &&
                <>
                    <button onClick={handleCopy}>Copy</button>
                    <button onClick={handlePaste}>Paste</button>
                    <FeatureButtons featureButtonsProps={featureButtonsProps}/>
                </>
            }
        </>
    );
};

export default SelectionBar;
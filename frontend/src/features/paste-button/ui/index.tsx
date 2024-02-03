import {
    useCopyFileMutation,
    useCopyFolderMutation,
    useGetFilesQuery,
    useGetFoldersQuery
} from "../../../shared/api/api.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {useParams} from "react-router-dom";
import {initialContextState, setContextMenu} from "../../context-menu";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";

const PasteButton = () => {

    const dispatch = useAppDispatch()

    const {id} = useParams() as { id: string }

    const {type} = useAppSelector(state => state.contextMenu)
    const {isFolder, id: objectId} = useAppSelector(state => state.selectionBar)

    const {refetch: foldersRefetch} = useGetFoldersQuery(id)
    const {refetch: filesRefetch} = useGetFilesQuery(id)

    const [copyFolder] = useCopyFolderMutation()
    const [copyFile] = useCopyFileMutation()

    const handlePaste = async () => {
        if (isFolder) {
            await copyFolder({id: objectId, folder: id})
            setTimeout(() => {
                foldersRefetch()
                type === "main" && dispatch(setContextMenu(initialContextState))
            }, 250)
        } else {
            await copyFile({id: objectId, folder: id})
            setTimeout(() => {
                filesRefetch()
                type === "main" && dispatch(setContextMenu(initialContextState))
            }, 250)
        }
    }

    return (
        <button disabled={!objectId} onClick={handlePaste}>Paste</button>
    );
};

export default PasteButton;
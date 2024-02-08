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

    const [copyFolder] = useCopyFolderMutation()
    const [copyFile] = useCopyFileMutation()

    const {refetch: foldersRefetch} = useGetFoldersQuery(id)
    const {refetch: filesRefetch} = useGetFilesQuery(id)

    const handlePaste = async () => {
        if (isFolder) {
            await copyFolder({id: objectId, folder: id});
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
        <div onClick={handlePaste}>
            <svg height="30" width="30" fill="#808080" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"
                 stroke="#808080">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M128 184c0-30.879 25.122-56 56-56h136V56c0-13.255-10.745-24-24-24h-80.61C204.306 12.89 183.637 0 160 0s-44.306 12.89-55.39 32H24C10.745 32 0 42.745 0 56v336c0 13.255 10.745 24 24 24h104V184zm32-144c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24 10.745-24 24-24zm184 248h104v200c0 13.255-10.745 24-24 24H184c-13.255 0-24-10.745-24-24V184c0-13.255 10.745-24 24-24h136v104c0 13.2 10.8 24 24 24zm104-38.059V256h-96v-96h6.059a24 24 0 0 1 16.97 7.029l65.941 65.941a24.002 24.002 0 0 1 7.03 16.971z"></path>
                </g>
            </svg>
            <p>Paste</p>
        </div>
    );
};

export default PasteButton;
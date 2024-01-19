import styles from './styles.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useGetFilesQuery, useGetFoldersQuery} from "../../shared/api/api.ts";
import {fileIcon, folderIcon} from "../../app/assets/images";
import {SizeCalculate} from "../../shared/lib/size-calculate.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../../shared/lib/hooks/useAppDispatch.ts";
import {getCurrentFolder} from "../../shared/api/folder/folder.slice.ts";
import {IFileData, IFolderData} from "../../shared/types";

const Folder = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {id} = useParams<keyof { id: string }>() as { id: string }

    const {data: files} = useGetFilesQuery(id)
    const {data: folders, isError} = useGetFoldersQuery(id)

    useEffect(() => {
        dispatch(getCurrentFolder())
    }, [dispatch, location.pathname]);

    const mergedData: (IFileData | IFolderData)[] = [
        ...(files ? files : []),
        ...(folders ? folders : []),
    ]

    const handleNavigate = (id: string) => {
        navigate(`/folder/${id}`)
    }

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
    }, [isError, navigate]);

    return (
        <div className={styles.folders}>
            <h2>Folder</h2>
            <div className={styles.wrapper}>
                {mergedData?.map(item => (
                    <div key={item.id} onClick={() => "title" in item && handleNavigate(item.id)}
                         className={styles.folder}>
                        <div style={{padding: '20px'}}>
                            <div className={styles.folderHeadline}>
                                <img
                                    height='40'
                                    width='40'
                                    src={"name" in item ? item.folder ? fileIcon : '' : folderIcon}
                                    alt="file"
                                />
                                <div style={{height: 'max-content'}}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <h4>{"name" in item ? item.name : item.title}</h4>
                            <p>last updated at<br/>{new Date(item.updated_at).toLocaleString()}</p>
                        </div>
                        <div className={styles.folderFooter}>
                            <h5>{SizeCalculate(item.size)}</h5>
                            <img src="" alt=""/>
                            {/*<Link to='/folder/nhWEwGByFQFTsCw7LhkxsB'>asdsadsa</Link>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Folder;
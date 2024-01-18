import styles from './styles.module.scss';
import {useParams} from "react-router-dom";
import {useGetFolderQuery} from "../../shared/api/api.ts";
import {folderIcon} from "../../app/assets/images";
import {SizeCalculate} from "../../shared/lib/size-calculate.ts";

const Folder = () => {

    const {id} = useParams<keyof { id: string }>() as { id: string }

    const {data} = useGetFolderQuery(id)

    return (
        <div className={styles.folders}>
            <h2>Folder</h2>
            <div className={styles.wrapper}>
                {data?.map(item => (
                    <div key={item.id} className={styles.folder}>
                        <div style={{padding: '20px'}}>
                            <div className={styles.folderHeadline}>
                                <img height='40' width='40' src={folderIcon} alt="folder"/>
                                <div style={{height: 'max-content'}}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <h4>{item.name}</h4>
                            <p>last updated at<br/>{new Date(item.updated_at).toLocaleString()}</p>
                        </div>
                        <div className={styles.folderFooter}>
                            <h5>{SizeCalculate(item.size)}</h5>
                            <img src="" alt=""/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Folder;
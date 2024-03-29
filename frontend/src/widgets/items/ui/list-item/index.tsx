import {FC} from "react";
import {FolderSvg, SharedSvg} from "../../../../app/assets/images";
import {renderFileTypeIcon} from "../../model/render-file-type-icon.tsx";
import {SizeCalculate} from "../../../../shared/lib/size-calculate.ts";
import {IMergedData} from "../../../../shared/types";

const ListItem: FC<{ item: IMergedData }> = ({item}) => {
    return (
        <>
            <div>
                {item.title ? item.is_public ? <SharedSvg/> : <FolderSvg/> : renderFileTypeIcon(item.name)}
                <h4>{item.title ? item.title : item.name}</h4>
            </div>
            <div style={{marginRight: '35px'}}>
                <h5>{SizeCalculate(item.size)}</h5>
                <p>{item.title ? 'Folder' : 'File'}</p>
                <h5>{new Date(item.created_at).toLocaleString()}</h5>
            </div>
        </>
    );
};

export default ListItem;
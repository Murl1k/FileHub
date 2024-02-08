import {FC} from "react";
import {FileSvg, FolderSvg} from "../../../app/assets/images";
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {IMergedData} from "../../../shared/types";

const ListItem: FC<{ item: IMergedData }> = ({item}) => {
    return (
        <>
            <div>
                {item.title ? <FolderSvg/> : <FileSvg/>}
                <h4>{item.title ? item.title : item.name}</h4>
            </div>
            <div style={{marginRight: '35px'}}>
                <h5>{SizeCalculate(item.size)}</h5>
                <p>{item.title ? 'Folder' : 'File'}</p>
            </div>
        </>
    );
};

export default ListItem;
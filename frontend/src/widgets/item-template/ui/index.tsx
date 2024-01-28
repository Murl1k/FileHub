import {Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import {IIsActive} from "../../../features/selection-bar";

interface IItemTemplate extends HTMLAttributes<HTMLDivElement> {
    itemProps: {
        id: string
        title: string
        isActiveId: string
        setIsClicked: Dispatch<SetStateAction<boolean>>
        setIsActive: Dispatch<SetStateAction<IIsActive>>
    }
}

const ItemTemplate: FC<IItemTemplate> = ({children, itemProps, ...props}) => {

    const {
        id,
        title,
        isActiveId,
        setIsClicked,
        setIsActive
    } = itemProps

    const navigate = useNavigate()

    const handleSingleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsClicked(true);

        if (isActiveId !== id) {
            setIsActive({status: true, id: id, isFolder: Boolean(title)})
        }
    };

    const handleDoubleClick = () => {
        if (title) {
            navigate(`/folder/${id}`)
        }
    };

    return (
        <div
            {...props}
            onClick={handleSingleClick}
            onDoubleClick={handleDoubleClick}
        >
            {children}
        </div>
    );
};

export default ItemTemplate;
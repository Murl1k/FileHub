import styles from './styles.module.scss'
import {ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState} from "react";
import {IMergedData} from "../../../../shared/types";
import {useUpdateFolderPrivacyMutation} from "../../../../shared/api/api.ts";
import {useOutsideClick} from "../../../../shared/lib/hooks/useClickOutside.ts";
import {contextMenuPosition, IContextMenu} from "../../";
import {FeatureButtons} from "../../../feature-buttons";

interface IContextMenuItem {
    item: IMergedData
    state: IContextMenu
    stateAction: Dispatch<SetStateAction<IContextMenu>>
}

const ContextMenuItem: FC<IContextMenuItem> = ({item, state, stateAction}) => {

    const [isOpen, setIsOpen] = useState(false)
    // const [isPrivacyOpen, setIsPrivacyOpen] = useState(item.is_public)
    const contextMenuRef = useRef<HTMLDivElement>(null)

    const [updatePrivacy] = useUpdateFolderPrivacyMutation()

    useOutsideClick<IContextMenu>(contextMenuRef, stateAction, {show: false, x: 0, y: 0}, state.show)

    const handleChangePrivacy = (e: ChangeEvent<HTMLInputElement>, id: string, title: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (title) {
            updatePrivacy({id: id, title: title})
        }
    }

    const featureButtonsProps = {
        stateAction,
        id: item.id,
        title: item.title,
        name: item.name,
        url: item.url
    }

    return (
        <>
            {isOpen &&
                // <div onClick={e => e.preventDefault()} className={styles.changePrivacy}>
                //     <div className={styles.privacy}>
                //         <h2>Change privacy</h2>
                //         <div className={styles.title}>
                //             <img src={folderIcon} alt="folders"/>
                //             <h4>{item.title}</h4>
                //         </div>
                //         <div className={styles.status}>
                //             <span>Status: {String(isPrivacyOpen)}</span>
                //             <button onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
                <label onClick={e => {
                    e.stopPropagation()
                }} className={styles.checkboxIos}>
                    <input checked={item.is_public}
                           onChange={(e) => handleChangePrivacy(e, item.id, item.title)}
                           type="checkbox"
                    />
                    <span className={styles.checkboxIosSwitch}></span>
                </label>
                //             </button>
                //         </div>
                //         <div className={styles.btns}>
                //             <button onClick={() => setIsOpen(false)}>Cancel</button>
                //             <button onClick={() => updatePrivacy({
                //                 id: item.id, title: item.title
                //             })}>
                //                 Apply
                //             </button>
                //         </div>
                //     </div>
                // </div>
            }
            <div
                onContextMenu={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    stateAction({
                        show: false,
                        x: 0,
                        y: 0
                    })
                }}
                ref={contextMenuRef}
                style={state.x ? contextMenuPosition(state.x, state.y, 118) : {
                    top: '40px',
                    right: '35px'
                }}
                className={styles.contextMenu}
            >
                <button onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(true)
                    // stateAction(false)
                }}>
                    Change privacy
                </button>
                <FeatureButtons featureButtonsProps={featureButtonsProps}/>
            </div>
        </>
    );
};

export default ContextMenuItem;
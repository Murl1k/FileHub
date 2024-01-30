import styles from "./styles.module.scss";
import Button from "../../../shared/UIKit/button";
import {Link} from "react-router-dom";
import {MouseEventHandler} from "react";
import {FilesPopup, FolderPopup} from "../../../features/popup";
import {UsersCount} from "../../users-count";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {setIsFilesOpen, setIsFoldersOpen} from "../../../features/context-menu";

const Header = () => {

    const dispatch = useAppDispatch()

    const {isFoldersOpen, isFilesOpen} = useAppSelector(state => state.contextMenuMain)

    const handleOpenFolder: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        dispatch(setIsFoldersOpen(!isFoldersOpen))

        if (isFilesOpen) {
            dispatch(setIsFilesOpen(false))
        }
    }

    const handleOpenFiles: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        dispatch(setIsFilesOpen(!isFilesOpen))

        if (isFoldersOpen) {
            dispatch(setIsFoldersOpen(false))
        }
    }

    return (
        <>
            {isFoldersOpen && <FolderPopup state={isFoldersOpen} stateAction={setIsFoldersOpen}/>}
            {isFilesOpen && <FilesPopup state={isFilesOpen} stateAction={setIsFilesOpen}/>}
            <header className={styles.header}>
                <div style={{display: 'flex', gap: '30px'}}>
                    <div className={styles.addBtn}>
                        <Button onClick={handleOpenFolder}>
                            <svg width="28" height="28" viewBox="0 0 24 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                                          fill="#583DA1"></path>
                                </g>
                            </svg>
                        </Button>
                        <p>Add Folder</p>
                    </div>
                    <div className={styles.addBtn}>
                        <Button onClick={handleOpenFiles}>
                            <svg width="28" height="28" viewBox="0 0 64 58" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M32.38 3.64099C24.7804 3.65158 17.4953 6.67588 12.1225 12.0505C6.74971 17.4252 3.72791 24.7114 3.71997 32.311C3.72791 39.9106 6.74971 47.1968 12.1225 52.5714C17.4953 57.9461 24.7804 60.9704 32.38 60.981C39.9813 60.9731 47.269 57.9499 52.644 52.575C58.0189 47.2 61.042 39.9123 61.05 32.311C61.042 24.7097 58.0189 17.422 52.644 12.047C47.269 6.67206 39.9813 3.64893 32.38 3.64099ZM43.05 25.921C42.8667 26.1957 42.6183 26.4207 42.3269 26.576C42.0355 26.7313 41.7102 26.812 41.38 26.811C40.986 26.8098 40.6007 26.6953 40.27 26.481L34.38 22.551V45.811C34.3809 46.0739 34.3298 46.3344 34.2296 46.5775C34.1294 46.8205 33.9822 47.0414 33.7963 47.2273C33.6104 47.4132 33.3896 47.5605 33.1465 47.6606C32.9034 47.7608 32.6429 47.8119 32.38 47.811C31.8496 47.811 31.3408 47.6003 30.9658 47.2252C30.5907 46.8501 30.38 46.3414 30.38 45.811V22.551L24.49 26.481C24.0483 26.7736 23.5085 26.879 22.9891 26.774C22.4698 26.669 22.0133 26.3622 21.72 25.921C21.4264 25.4805 21.3195 24.9416 21.4225 24.4223C21.5256 23.9031 21.8304 23.4459 22.27 23.151L31.26 17.161L31.27 17.151C31.5984 16.9309 31.9847 16.8135 32.38 16.8135C32.7753 16.8135 33.1616 16.9309 33.49 17.151L33.66 17.271L42.49 23.151C42.9312 23.4443 43.238 23.9008 43.343 24.4202C43.448 24.9395 43.3426 25.4793 43.05 25.921Z"
                                        fill="#1560A7"></path>
                                </g>
                            </svg>
                        </Button>
                        <p>Add Files</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <UsersCount/>
                    <Link to='/profile'>
                        <Button>
                            <svg viewBox="0 0 20 20" width='20' height='20' version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"><title>profile [#1335]</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Dribbble-Light-Preview" transform="translate(-420.000000, -2159.000000)"
                                           fill="#000000">
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path
                                                    d="M374,2009 C371.794,2009 370,2007.206 370,2005 C370,2002.794 371.794,2001 374,2001 C376.206,2001 378,2002.794 378,2005 C378,2007.206 376.206,2009 374,2009 M377.758,2009.673 C379.124,2008.574 380,2006.89 380,2005 C380,2001.686 377.314,1999 374,1999 C370.686,1999 368,2001.686 368,2005 C368,2006.89 368.876,2008.574 370.242,2009.673 C366.583,2011.048 364,2014.445 364,2019 L366,2019 C366,2014 369.589,2011 374,2011 C378.411,2011 382,2014 382,2019 L384,2019 C384,2014.445 381.417,2011.048 377.758,2009.673"
                                                    id="profile-[#1335]"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </Button>
                    </Link>
                </div>
            </header>
        </>
    );
};

export default Header;
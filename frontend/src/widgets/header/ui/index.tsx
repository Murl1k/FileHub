import styles from "./styles.module.scss";
import Button from "../../../shared/UIKit/button";
import {useState} from "react";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {fetchLogout} from "../../../features/auth/model/auth.action.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {selectIsAuth} from "../../../features/auth/model/auth.slice.ts";
import {Link} from "react-router-dom";

const Header = () => {

    const isAuth = useAppSelector(selectIsAuth)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(fetchLogout())

        setIsOpen(false)
    }

    return (
        <header className={styles.header}>
            <div className={styles.addBtn}>
                <Button>
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
                <p>Add File</p>
            </div>
            <div className={styles.info}>
                <button>
                    <svg width='20' height='20' viewBox="0 0 512 567" xmlns="http://www.w3.org/2000/svg"
                         fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill="var(--ci-primary-color, #583DA1)"
                                  d="M16,48V464H496V48ZM464,432H48V336H464Zm0-128H48V208H464ZM48,176V80H464v96Z"
                                  className="ci-primary"></path>
                            <rect width="32" height="32" x="80" y="112" fill="var(--ci-primary-color, #583DA1)"
                                  className="ci-primary"></rect>
                            <rect width="32" height="32" x="80" y="240" fill="var(--ci-primary-color, #583DA1)"
                                  className="ci-primary"></rect>
                            <rect width="32" height="32" x="80" y="368" fill="var(--ci-primary-color, #583DA1)"
                                  className="ci-primary"></rect>
                        </g>
                    </svg>
                    <p>10 / 140 Gb</p>
                    <span>Storage Usage</span>
                </button>
                <Link to='/profile/settings'>
                    <Button>
                        <svg fill="#000000" viewBox="0 0 24 24" width="24" height="24"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M20.991,10H19.42a1.039,1.039,0,0,1-.951-.674l-.005-.013a1.04,1.04,0,0,1,.2-1.146l1.11-1.11a1.01,1.01,0,0,0,0-1.428l-1.4-1.4a1.01,1.01,0,0,0-1.428,0l-1.11,1.11a1.04,1.04,0,0,1-1.146.2l-.013,0A1.04,1.04,0,0,1,14,4.579V3.009A1.009,1.009,0,0,0,12.991,2H11.009A1.009,1.009,0,0,0,10,3.009v1.57a1.04,1.04,0,0,1-.674.952l-.013,0a1.04,1.04,0,0,1-1.146-.2l-1.11-1.11a1.01,1.01,0,0,0-1.428,0l-1.4,1.4a1.01,1.01,0,0,0,0,1.428l1.11,1.11a1.04,1.04,0,0,1,.2,1.146l0,.013A1.039,1.039,0,0,1,4.58,10H3.009A1.009,1.009,0,0,0,2,11.009v1.982A1.009,1.009,0,0,0,3.009,14H4.58a1.039,1.039,0,0,1,.951.674l0,.013a1.04,1.04,0,0,1-.2,1.146l-1.11,1.11a1.01,1.01,0,0,0,0,1.428l1.4,1.4a1.01,1.01,0,0,0,1.428,0l1.11-1.11a1.04,1.04,0,0,1,1.146-.2l.013.005A1.039,1.039,0,0,1,10,19.42v1.571A1.009,1.009,0,0,0,11.009,22h1.982A1.009,1.009,0,0,0,14,20.991V19.42a1.039,1.039,0,0,1,.674-.951l.013-.005a1.04,1.04,0,0,1,1.146.2l1.11,1.11a1.01,1.01,0,0,0,1.428,0l1.4-1.4a1.01,1.01,0,0,0,0-1.428l-1.11-1.11a1.04,1.04,0,0,1-.2-1.146l.005-.013A1.039,1.039,0,0,1,19.42,14h1.571A1.009,1.009,0,0,0,22,12.991V11.009A1.009,1.009,0,0,0,20.991,10ZM12,15a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path>
                            </g>
                        </svg>
                    </Button>
                </Link>
                <Button>
                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 64 58"
                         width='20' height='20'
                         enableBackground="new 0 0 64 64" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path fill="#000000"
                                      d="M56,44c-1.832,0-4-2.168-4-4V20C52,8.973,43.027,0,32,0S12,8.973,12,20v20c0,1.793-2.207,4-4,4 c-2.211,0-4,1.789-4,4s1.789,4,4,4h48c2.211,0,4-1.789,4-4S58.211,44,56,44z"></path>
                                <path fill="#000000"
                                      d="M32,64c4.418,0,8-3.582,8-8H24C24,60.418,27.582,64,32,64z"></path>
                            </g>
                        </g>
                    </svg>
                </Button>
                <Link to='/profile'>
                    <Button>
                        <svg viewBox="0 0 20 20" width='20' height='20' version="1.1" xmlns="http://www.w3.org/2000/svg"
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
                {isAuth && isOpen &&
                    <div style={{padding: '20px', background: "fff", position: "fixed", right: '0', top: '60px'}}>
                        <button onClick={logout}>Logout</button>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;
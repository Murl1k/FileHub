import styles from "./styles.module.scss";
import {useCallback, useEffect} from "react";
import {fetchGetUsersCount} from "../../auth";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";

const UsersCount = () => {

    const dispatch = useAppDispatch()

    const {users_count} = useAppSelector(state => state.auth)

    const getUsers = useCallback(() => {
        dispatch(fetchGetUsersCount())
        setTimeout(getUsers, 60000)
    }, [dispatch])

    useEffect(() => {
        getUsers()
    }, [dispatch, getUsers]);

    return (
        <div className={styles.usersCount}>
            <svg height="80" width="80" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 354.856 354.856" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <path style={{fill: '#000000'}}
                              d="M307.943,199.173c16.571-15.084,26.979-36.832,26.979-61.008c0-45.55-36.925-82.474-82.474-82.474 c-33.914,0-63.045,20.476-75.713,49.737c15.541,17.534,24.992,40.582,24.992,65.8c0,21.149-6.804,41.654-19.089,58.524 c11.606,10.24,21.178,22.617,28.169,36.35h144.049C348.867,237.946,331.568,213.976,307.943,199.173z"></path>
                        <path style={{fill: '#583DA1'}}
                              d="M0,299.166h204.811c-5.986-28.155-23.285-52.126-46.912-66.929 c16.573-15.084,26.979-36.832,26.979-61.009c0-45.549-36.924-82.474-82.474-82.474c-45.545,0-82.471,36.925-82.471,82.474 c0,24.177,10.404,45.925,26.978,61.009C23.284,247.04,5.986,271.01,0,299.166z"></path>
                    </g>
                </g>
            </svg>
            <div>
                <p>Registered users</p>
                <span>{Boolean(users_count) && users_count}</span>
            </div>
        </div>
    );
};

export default UsersCount;
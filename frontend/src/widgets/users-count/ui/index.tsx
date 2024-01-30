import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {useCallback, useEffect} from "react";
import {fetchGetUsersCount} from "../../../features/auth/model/auth.action.ts";

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
            <p>Users count: {Boolean(users_count) && users_count}</p>
        </button>
    );
};

export default UsersCount;
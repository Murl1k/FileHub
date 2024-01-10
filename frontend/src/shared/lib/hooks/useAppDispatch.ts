import {useDispatch} from "react-redux";
import {AppDispatch} from "../../api/store/store.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>()
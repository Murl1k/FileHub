import {useDispatch} from "react-redux";
import {AppDispatch} from "../../api/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
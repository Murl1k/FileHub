import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../api/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../api/store/store.ts";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
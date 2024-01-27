import {Dispatch, RefObject, SetStateAction, useEffect} from "react";

export const useOutsideClick = <T>(elementRef: RefObject<HTMLElement>, handler: Dispatch<SetStateAction<T>>, handlerValue: T, attached: boolean = true) => {
    useEffect(() => {
        if (!attached) return

        const handleClickOutside = (e: MouseEvent) => {
            if (!elementRef.current?.contains(e.target as Node)) {
                handler(handlerValue)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [elementRef, handler, handlerValue, attached])
}
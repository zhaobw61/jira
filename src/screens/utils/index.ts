import { useState, useEffect } from "react";
export const isFalsy = (value: any) => value === 0 ? false : !value;
export const  cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key];
        if(isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result;
}

export const useDebounce = (value: any, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timeOut = setTimeout(() => setDebounceValue(value), delay);
        return () => {
            clearTimeout(timeOut)
        }
    }, [value, delay]);
    return debounceValue;
}
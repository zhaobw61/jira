import { useState, useEffect } from "react";
export const isFalsy = (value) => value === 0 ? false : !value;
export const  cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key];
        if(isFalsy(value)) {
            delete result[key]
        }
    })
    return result;
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        console.log('useEffect');
        const timeOut = setTimeout(() => setDebounceValue(value), delay);
        return () => {
            console.log('clear');
            clearTimeout(timeOut)
        }
    }, [value, delay]);
    return debounceValue;
}
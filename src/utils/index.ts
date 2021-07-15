import { useState, useEffect } from "react";
export const isFalsy = (value: unknown) => value === 0 ? false : !value;
export const isVoid = (value: unknown) => value === undefined || value === null || value === '';
export const  cleanObject = (object: {[key: string]: unknown}) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key];
        if(isVoid(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = document.title;
    useEffect(() => {
        document.title = title;
    }, [title, oldTitle, keepOnUnmount])

    useEffect(() => {
        return () => {
            if(!keepOnUnmount) {
                document.title = oldTitle;
            }
        }
    }, [keepOnUnmount, oldTitle]);
}

export const resetRoute = () => {
    window.location.href = window.location.origin;
}

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown },K extends keyof O>( obj: O, keys: K[]) => {
    const filteredEntries = Object.entries(obj).filter(([key]) =>
        keys.includes(key as K)
    );
    return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
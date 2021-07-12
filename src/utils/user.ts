import { useAsync } from "./use-async";
import { Project } from "../types/project";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce } from './index';
import { useHttp } from "./http";
import { User } from "../types/user";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();

    useEffect(() => {
        run(client('users', {data: cleanObject(param || {})}));
        // eslint-disable-next-line
    }, [param]);
    return result;
}